import { IGetAssetByWithinDTO } from "../dto/request/get-assets-by-within.dto.interface";
import { IGetAssetByDateDTO } from "../dto/request/get-assets-by-date.dto.interface";
import { IAssetResponseDTO } from "../dto/response/asset.response.dto.interface";

/**
 * Interface defining the contract for the Asset Controller.
 * Handles HTTP requests for asset retrieval and spatial searches.
 */
export interface IAssetController {
  /**
   * Retrieves a list of processed assets filtered by date.
   * Uses the GetAssetByDateDTO for request validation.
   */
  getAll(query: IGetAssetByDateDTO): Promise<IAssetResponseDTO[]>;

  /**
   * Performs a spatial search within a bounding box (rectangle).
   */
  getByWithin(query: IGetAssetByWithinDTO): Promise<IAssetResponseDTO[]>;

  /**
   * Retrieves the details of a specific asset.
   * Updated to handle the full parameter DTO.
   */
  getById(query: string): Promise<IAssetResponseDTO>;
}