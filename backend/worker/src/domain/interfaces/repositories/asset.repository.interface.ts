import { Asset } from 'src/infrastructure/schemas/asset.schema';

export interface IAssetRepository  
{
    save(asset: any): Promise<any>;
    findById(assetId: string): Promise<Asset | null>;
}