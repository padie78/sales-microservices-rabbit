import { Injectable, Inject} from '@nestjs/common';
import { IProcessAssetUseCase } from '../../domain/interfaces/use-cases/process-asset.usecase.interface';
import { IAssetRepository } from 'src/domain/interfaces/repositories/asset.repository.interface';
import { AssetDTO } from '../dtos/asset.dto';
import { AssetMapper } from 'src/shared/mappers/asset.mapper';
import { ICacheService } from 'src/domain/interfaces/cache/cache.interface';
import { AssetValidator } from 'src/domain/utils/asset.validator';
import { FileStorageService } from 'src/infrastructure/services/file-storage.service';

@Injectable()
export class ProcessAssetUseCase implements IProcessAssetUseCase {
  constructor(
    private readonly fileService: FileStorageService,
    @Inject('ICacheService') private readonly cache: ICacheService,
    @Inject('IAssetRepository') private readonly assetRepository: IAssetRepository) {}

  async execute(assetDto: AssetDTO): Promise<void> {
    const { filename, fullPath } = assetDto;
    
    // Control keys for Redis state management
    const keys = {
      status: `geo:status:${filename}`,
      processing: `geo:processing:${filename}`,
      retry: `geo:retry:${filename}`
    };

    // 1. IDEMPOTENCY CHECK (Early Return)
    // Check if the asset is already being processed to prevent race conditions
    const isLocked = await this.cache.get(keys.processing);
    if (isLocked) return; 

    try {
      // Set processing lock and update initial status
      await this.cache.set(keys.processing, 'TRUE', 300);
      await this.cache.set(keys.status, 'IN_PROGRESS');

      // 2. EXTRACTION AND MAPPING
      // Read file from storage and convert raw JSON data into a Domain Entity
      const fileContent = this.fileService.readFile(fullPath);
      const rawData = JSON.parse(fileContent);
      
      const assetEntity = AssetMapper.toEntity(assetDto, rawData);

      // 3. DUPLICATE VALIDATION (Persistence Layer)
      // Verify if the asset already exists in the database
      const exists = await this.assetRepository.findById(assetEntity.assetId);
      if (exists) {
        await this.handleExistingAsset(assetDto, keys);
        return;
      }

      // 4. DOMAIN VALIDATIONS (Business Logic)
      // Perform geospatial logic checks (Bounding Box ranges and consistency)
      AssetValidator.validate(assetEntity.boundingBox);

      // 5. PERSISTENCE AND CACHE (Metadata)
      // Persist the entity to MongoDB and update the cache-aside storage
      await this.assetRepository.save(assetEntity);
      
      const metaKey = `geo:meta:${assetEntity.assetId}`;
      await this.cache.set(metaKey, JSON.stringify(assetEntity), 3600);
      await this.cache.del('assets:list:all'); // Invalidate the list cache

      // 6. SUCCESSFUL COMPLETION
      // Relocate the file to the processed folder and clear locks
      await this.fileService.moveFileToFolder(assetDto.fullPath, assetDto.filename, '/app/data/processed');
      await this.cache.set(keys.status, 'PROCESSED');
      await this.cache.del(keys.processing);
      await this.cache.del(keys.retry);

    } catch (error) {
      // Delegate error management to the specialized handler
      await this.handleProcessingError(assetDto, error, keys);
    }
  }

  /**
   * Handles assets that are already present in the system
   */
  private async handleExistingAsset(dto: AssetDTO, keys: any): Promise<void> {
    console.log(`🔎 Asset detected as duplicate: ${dto.filename}. Cleaning up...`);

    // Ensure cache status consistency
    await this.cache.set(keys.status, 'PROCESSED');

    // Release the processing lock
    await this.cache.del(keys.processing);

    // Move the file to processed folder to clear the incoming directory
    await this.fileService.moveFileToFolder(dto.fullPath, dto.filename, '/app/data/processed');

    // Return silently to allow RabbitMQ ACK
  }

  /**
   * Manages retries and failure states
   */
  private async handleProcessingError(dto: AssetDTO, error: any, keys: any) {
    const attempts = await this.cache.incr(keys.retry);
    await this.cache.del(keys.processing); // Always release lock on error

    if (attempts >= 3) {
      // Max retries reached: set terminal failure state
      await this.cache.set(keys.status, 'PERMANENT_FAILURE');
      console.error(`Permanent failure for ${dto.filename}`);
      // No error re-thrown: message will be ACKed and removed from queue
    } else {
      // Mark as retrying and re-throw error to trigger RabbitMQ re-queue (NACK)
      await this.cache.set(keys.status, 'FAILED_RETRYING');
      throw error; 
    }
  }
}