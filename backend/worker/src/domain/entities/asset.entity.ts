import { IBoundingBox } from "../interfaces/dto/create/bounding-box.dto.interface";
import { IAsset } from "../interfaces/entities/asset.entity.interface";

export class Asset implements IAsset {
  constructor(
    public readonly assetId: string,
    public readonly boundingBox: IBoundingBox,
    public readonly fileReference: string,
    public readonly timestamp: Date,
    public readonly processingStatus: string
  ) {}
}