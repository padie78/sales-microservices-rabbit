import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ICacheService } from 'src/domain/interfaces/cache/cache.interface';
import { IAsset } from 'src/domain/interfaces/entities/asset.entity.interface';
import { IAssetRepository } from 'src/domain/interfaces/repositories/asset.repository.interface';
import { ISearchAssetsWithinUseCase } from 'src/domain/interfaces/use-cases/search-assets-within.interface';

@Injectable()
export class SearchAssetsWithinUseCase implements ISearchAssetsWithinUseCase {
  constructor(
    @Inject('IAssetRepository') 
    private readonly assetRepository: IAssetRepository,
    @Inject('ICacheService') 
    private readonly cacheService: ICacheService,
  ) {}

  async execute(
    minLat: number, 
    minLon: number, 
    maxLat: number, 
    maxLon: number
  ): Promise<IAsset[]> {
    
    // Integrity Validations
    if (minLat >= maxLat) {
      throw new BadRequestException('minLat must be less than maxLat');
    }
    if (minLon >= maxLon) {
      throw new BadRequestException('minLon must be less than maxLon');
    }

    // Generate a unique cache key for these specific coordinates
    // Format represents the area: assets:within:minLat:minLon:maxLat:maxLon
    const cacheKey = `assets:within:${minLat}:${minLon}:${maxLat}:${maxLon}`;

    // 3. Attempt to retrieve from Redis
    try {
      const cachedData = await this.cacheService.get(cacheKey);
      if (cachedData) {
        console.log(`[Cache HIT] Spatial search in area [${cacheKey}]`);
        return typeof cachedData === 'string' ? JSON.parse(cachedData) : cachedData;
      }
    } catch (error) {
      console.error('Spatial search cache error:', error);
    }

    // If not in cache, query MongoDB
    const assets = await this.assetRepository.findWithin(minLat, minLon, maxLat, maxLon);

    // Store result in Redis
    if (assets.length > 0) {
      try {
        await this.cacheService.set(cacheKey, JSON.stringify(assets), 600); // 10 min TTL
      } catch (error) {
        console.error('Error saving spatial search to Redis:', error);
      }
    }

    console.log(`[Cache MISS] Spatial search retrieved from MongoDB`);
    return assets;
  }
}