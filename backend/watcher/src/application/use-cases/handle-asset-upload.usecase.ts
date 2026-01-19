import { Injectable, Inject} from '@nestjs/common';
import { RabbitMQAssetPublisher } from '../../infrastructure/messaging/asset.publisher';
import { AssetMapper } from '../../shared/mappers/asset.mapper';
import { IHandleAssetUploadUseCase } from '../../domain/interfaces/use-cases/handle-asset-upload.usecase.interface';
import { IAssetCreateDTO } from '../../domain/interfaces/dto/create/asset.create.dto.interface';

@Injectable()
export class HandleAssetUploadUseCase implements IHandleAssetUploadUseCase {
  constructor(private readonly publisher: RabbitMQAssetPublisher) {}

  /**
   * Executes the asset processing logic.
   * Maps the raw DTO and file context to a domain entity and publishes it to the message broker.
   */
  async execute(assetCreateDTO: IAssetCreateDTO, fileContext: { filename: string; fullPath: string }): Promise<void> {
    // Transform raw input data and file metadata into a domain-specific entity
    const asset_metadata = AssetMapper.toEntity(assetCreateDTO, fileContext);
    
    // Dispatch the mapped entity to the RabbitMQ exchange for asynchronous processing
    await this.publisher.publish(asset_metadata);
  }
}