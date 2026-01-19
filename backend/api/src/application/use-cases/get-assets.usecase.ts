import { Injectable, Inject } from '@nestjs/common';
import { ICacheService } from 'src/domain/interfaces/cache/cache.interface';
import { IAsset } from 'src/domain/interfaces/entities/asset.entity.interface';
import { IAssetRepository } from 'src/domain/interfaces/repositories/asset.repository.interface';
import { IGetAssetsUseCase } from 'src/domain/interfaces/use-cases/get-assets.usecase.interface';

@Injectable()
export class GetAssetsUseCase implements IGetAssetsUseCase {
  constructor(
    @Inject('IAssetRepository') 
    private readonly assetRepository: IAssetRepository,
    @Inject('ICacheService') 
    private readonly cacheService: ICacheService,
  ) {}

  async execute(date?: string): Promise<IAsset[]> {
    // 1. Define a unique cache key (if no date is provided, use 'all')
    const cacheKey = `assets:list:${date || 'all'}`;

    // 2. Attempt to retrieve the list from Redis
    try {
      const cachedData = await this.cacheService.get(cacheKey);
      if (cachedData) {
        console.log(`[Cache HIT] Asset list (${date || 'all'}) retrieved from Redis`);
        // Deserialize the string into an array of objects
        return typeof cachedData === 'string' ? JSON.parse(cachedData) : cachedData;
      }
    } catch (error) {
      console.error('Error retrieving list from Redis:', error);
    }

    // 3. If not in cache, query MongoDB
    const assets = await this.assetRepository.findAll(date);

    // 4. Save the result in Redis for future queries
    if (assets.length > 0) {
      try {
        // Serialize the complete array into a JSON string
        await this.cacheService.set(cacheKey, JSON.stringify(assets), 1800); // 30 min TTL
      } catch (error) {
        console.error('Error saving list to Redis:', error);
      }
    }

    console.log(`[Cache MISS] Asset list retrieved from MongoDB`);
    return assets;
  }
}