import { IAsset } from '../entities/asset.entity.interface';

/**
 * Interface for the Asset Repository, defining the persistence operations 
 * for geospatial asset data.
 */
export interface IAssetRepository {
  /**
   * Retrieves all assets, with an optional filter by date.
   * Expected date format: YYYY-MM-DD.
   */
  findAll(date?: string): Promise<IAsset[]>;

  /**
   * Searches for a specific asset using its unique business identifier (assetId).
   */
  findById(id: string): Promise<IAsset | null>;

  /**
   * Performs a geospatial search to find assets contained within a Bounding Box.
   */
  findWithin(
    minLat: number, 
    minLon: number, 
    maxLat: number, 
    maxLon: number
  ): Promise<IAsset[]>;
}