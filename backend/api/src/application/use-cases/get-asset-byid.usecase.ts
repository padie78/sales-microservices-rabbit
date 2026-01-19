import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ICacheService } from 'src/domain/interfaces/cache/cache.interface';
import { IAsset } from 'src/domain/interfaces/entities/asset.entity.interface'; 
import { IAssetRepository } from 'src/domain/interfaces/repositories/asset.repository.interface';
import { IGetAssetByIdUseCase } from 'src/domain/interfaces/use-cases/get-asset-byid.usecase.inteface';

@Injectable()
export class GetAssetByIdUseCase implements IGetAssetByIdUseCase {
  constructor(
    @Inject('IAssetRepository') private readonly assetRepository: IAssetRepository,
    @Inject('ICacheService') private readonly cacheService: ICacheService,
  ) {}

  /**
   * Executes the use case to find a single asset by its ID.
   * Implements a Cache-Aside pattern: checks Redis first, then falls back to MongoDB.
   */
  async execute(id: string): Promise<IAsset> {
    const cacheKey = `geo:meta:${id}`;

    // 1. Attempt to retrieve data from Redis
    try {
      const cachedData = await this.cacheService.get(cacheKey);
      if (cachedData) {
        console.log(`[Cache HIT] Asset ${id} retrieved from Redis`);
        
        /** * Transformation: Redis stores data as strings. 
         * Ensure the returned value is parsed back into an object.
         */
        return typeof cachedData === 'string' ? JSON.parse(cachedData) : cachedData;
      }
    } catch (error) {
      console.error('Error accessing Redis:', error);
    }

    // 2. If not in Redis (Cache MISS), search in MongoDB
    const asset = await this.assetRepository.findById(id);

    if (!asset) {
      throw new NotFoundException(`Asset with id ${id} not found`);
    }

    console.log(`[Cache MISS] Asset ${id} retrieved from MongoDB`);

    // 3. Store the result in Redis for future requests (TTL: 3600s / 1 hour)
    try {
      await this.cacheService.set(cacheKey, JSON.stringify(asset), 3600);
    } catch (error) {
      console.error('Error saving to Redis:', error);
    }

    return asset;
  }
}