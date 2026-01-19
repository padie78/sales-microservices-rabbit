import { IBoundingBox } from "./bounding-box.dto.interface";

export interface IAssetCreateDTO {
  assetId: string;
  timestamp: string;
  bbox: IBoundingBox;
  resolution: number;
  source: string;
}