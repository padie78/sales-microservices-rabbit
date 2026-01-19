import { IAsset } from "../entities/asset.entity.interface";

/**
 * Contract for the Use Case that retrieves the list of processed assets.
 * Supports optional filtering by creation date.
 */
export interface IGetAssetsUseCase {
  /**
   * Retrieves all assets persisted in the database.
   * Accepts an optional date string in YYYY-MM-DD format to filter results.
   * Resolves with an array of IAsset domain entities.
   */
  execute(date?: string): Promise<IAsset[]>;
}