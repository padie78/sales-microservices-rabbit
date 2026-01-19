import { IAssetResponseDTO } from "src/domain/interfaces/dto/response/asset.response.dto.interface";

export class AssetResponseDTO implements IAssetResponseDTO {
  assetId: string;
  filename: string;
  area: number;
  center: [number, number]; // [lon, lat]
  processedAt: Date;
}