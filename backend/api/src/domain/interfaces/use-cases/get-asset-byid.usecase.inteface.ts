import { IAsset } from "../entities/asset.entity.interface";

/**
 * Interface for the Use Case that retrieves an Asset by its unique identifier.
 * This contract ensures the Controller remains decoupled from infrastructure 
 * implementations such as Redis or MongoDB.
 */
export interface IGetAssetByIdUseCase {
  /**
   * Executes the business logic to retrieve an asset.
   * Resolves with the Asset entity or throws a NotFoundException if the 
   * asset is missing from both cache and persistent storage.
   */
  execute(id: string): Promise<IAsset>;
}