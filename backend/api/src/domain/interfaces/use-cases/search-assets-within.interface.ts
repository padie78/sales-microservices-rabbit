import { IAsset } from "../entities/asset.entity.interface";

/**
 * Contract for the Use Case that searches for assets within a geographical area.
 * Defines the logic to filter assets that intersect with a Bounding Box.
 */
export interface ISearchAssetsWithinUseCase {
  /**
   * Executes the geographical search.
   * Returns a promise with an array of assets located within the specified area.
   */
  execute(
    minLat: number, 
    minLon: number, 
    maxLat: number, 
    maxLon: number
  ): Promise<IAsset[]>;
}