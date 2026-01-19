import { IBoundingBox } from './bounding-box.interface';

export interface IAsset {
  assetId: string;
  boundingBox: IBoundingBox;
  fileReference: string;
  timestamp: Date;
  processingStatus: string;
}