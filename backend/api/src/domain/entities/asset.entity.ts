import { IAsset } from "../interfaces/entities/asset.entity.interface";
import { IBoundingBox } from "../interfaces/entities/bounding-box.interface";

export class AssetEntity implements IAsset {
  constructor(
    public readonly assetId: string,
    public readonly boundingBox: IBoundingBox,
    public readonly fileReference: string,
    public readonly timestamp: Date,
    public readonly processingStatus: string
  ) {}
}