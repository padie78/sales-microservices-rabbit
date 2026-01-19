import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssetDocument = Asset & Document;

@Schema({ 
  timestamps: true,
  collection: 'assets' 
})
export class Asset {
  @Prop({ required: true, unique: true })
  assetId: string;

  @Prop({
    type: {
      minLat: { type: Number, required: true },
      maxLat: { type: Number, required: true },
      minLon: { type: Number, required: true },
      maxLon: { type: Number, required: true },
    },
    required: true,
    _id: false 
  })
  boundingBox: {
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
  };

  @Prop({ required: true })
  fileReference: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ 
    required: true, 
    enum: ['PENDING', 'PROCESSED', 'FAILED'], 
    default: 'PROCESSED'
  })
  processingStatus: string;

  @Prop()
  processingError?: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
