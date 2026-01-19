import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAssetRepository } from '../../domain/interfaces/repositories/asset.repository.interface';
import { IAsset } from '../../domain/interfaces/entities/asset.entity.interface';
import { Asset, AssetDocument } from '../schemas/asset.schema';

@Injectable()
export class AssetMongoRepository implements IAssetRepository {
  constructor(
    @InjectModel(Asset.name) private readonly assetModel: Model<AssetDocument>
  ) {}

  // Find by unique business ID (assetId)
  async findById(id: string): Promise<IAsset | null> {
    const doc = await this.assetModel.findOne({ assetId: id }).lean().exec();
    return doc as unknown as IAsset;
  }

  // Retrieve all with an optional date filter (using the 'timestamp' field)
  async findAll(date?: string): Promise<IAsset[]> {
    const query: any = {};
    if (date) {
      const start = new Date(date);
      start.setUTCHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setUTCHours(23, 59, 59, 999);
      query.timestamp = { $gte: start, $lte: end };
    }

    const docs = await this.assetModel.find(query).sort({ timestamp: -1 }).lean().exec();
    return docs as unknown as IAsset[]; 
  }

  // Spatial Search (Bounding Box) using numerical comparison
  async findWithin(
    minLat: number, 
    minLon: number, 
    maxLat: number, 
    maxLon: number
  ): Promise<IAsset[]> {
    const docs = await this.assetModel.find({
      'boundingBox.minLat': { $gte: minLat },
      'boundingBox.maxLat': { $lte: maxLat },
      'boundingBox.minLon': { $gte: minLon },
      'boundingBox.maxLon': { $lte: maxLon }
    }).lean().exec();

    return docs as unknown as IAsset[];
  }
}