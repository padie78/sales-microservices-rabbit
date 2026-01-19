import { IAsset } from "../../domain/interfaces/entities/asset.entity.interface";
import { AssetResponseDTO } from "src/presentation/dto/response/asset-response.dto";

/**
 * Data transformation layer for Asset Domain Entities and Presentation DTOs
 */
export class AssetMapper {
  
  /**
   * Transforms a Domain Entity into a structured Response DTO
   * @param entity - The source IAsset entity from the database
   * @returns A mapped AssetResponseDTO with calculated spatial metadata
   */
  static toDto(entity: IAsset): AssetResponseDTO {
    const { minLat, maxLat, minLon, maxLon } = entity.boundingBox;

    // 1. Calculate the geographic center point [longitude, latitude]
    const centerLon = (minLon + maxLon) / 2;
    const centerLat = (minLat + maxLat) / 2;

    // 2. Calculate the approximate area (Base * Height)
    // Note: This uses degree-based area for simple visualization.
    // For high-precision geographic area, Haversine or Vincenty formulas would be required.
    const width = Math.abs(maxLon - minLon);
    const height = Math.abs(maxLat - minLat);
    const area = width * height;

    return {
      assetId: entity.assetId,
      filename: entity.fileReference, // Mapping domain fileReference to presentation filename
      area: Number(area.toFixed(6)),   // Rounded to 6 decimal places for data cleanliness
      center: [centerLon, centerLat],
      processedAt: entity.timestamp,   // Mapping domain timestamp to presentation processedAt
    };
  }

  /**
   * Transforms an array of Domain Entities into a list of DTOs
   */
  static toDtoList(entities: IAsset[]): AssetResponseDTO[] {
    return entities.map(entity => this.toDto(entity));
  }
}