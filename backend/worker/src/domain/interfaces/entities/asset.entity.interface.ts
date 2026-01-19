import { IBoundingBox } from "../dto/create/bounding-box.dto.interface";

export interface IAsset {
  assetId: string;
  boundingBox: IBoundingBox;    
  fileReference: string;
  timestamp: Date;
  processingStatus: string;
}