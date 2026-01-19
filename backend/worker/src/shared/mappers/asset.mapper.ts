import { AssetDTO } from "src/application/dtos/asset.dto";
import { Asset } from "src/domain/entities/asset.entity";

export class AssetMapper {
  static toDto(data: any): AssetDTO {
    return {
      filename: data.filename,
      fullPath: data.fullPath,
      receivedAt: data.receivedAt,
    };
  }


  static toEntity(dto: AssetDTO, assetData: any): Asset {
    const rawDate = assetData.timestamp; 
    const cleanDate = rawDate?.$date ? new Date(rawDate.$date) : new Date(rawDate);

    return {
      assetId: assetData.assetId,
      boundingBox: {
        minLat: assetData.bbox.minLat,
        maxLat: assetData.bbox.maxLat,
        minLon: assetData.bbox.minLon,
        maxLon: assetData.bbox.maxLon,
      },
      fileReference: dto.fullPath,
      timestamp: cleanDate, 
      processingStatus: 'PROCESSED',
    };
  }  
}