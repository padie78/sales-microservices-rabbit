import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssetDocument = Asset & Document;

@Schema({ _id: false })
class BoundingBox {
  @Prop({ required: true })
  minLat: number;

  @Prop({ required: true })
  maxLat: number;

  @Prop({ required: true })
  minLon: number;

  @Prop({ required: true })
  maxLon: number;
}

@Schema({ 
  timestamps: true,
  collection: 'assets'
}) 
export class Asset {
  @Prop({ required: true, unique: true })
  assetId: string;

  @Prop({ type: BoundingBox, required: true })
  boundingBox: BoundingBox;

  @Prop({ required: true })
  fileReference: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ required: true })
  processingStatus: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
