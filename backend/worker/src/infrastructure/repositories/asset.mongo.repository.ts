import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Asset, AssetDocument } from '../schemas/asset.schema';
import { IAssetRepository } from 'src/domain/interfaces/repositories/asset.repository.interface';

@Injectable()
export class AssetMongoRespository implements IAssetRepository {
  constructor(
    @InjectModel(Asset.name) private assetModel: Model<AssetDocument>
  ) {}

  async save(asset: any): Promise<any> {
    return new this.assetModel(asset).save();
  }

  async findById(assetId: string): Promise<Asset | null> {
    return this.assetModel.findOne({ assetId }).exec();
  }
}