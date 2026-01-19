import { IAssetCreateDTO } from "../dto/create/asset.create.dto.interface";

export interface IProcessAssetUseCase {
  execute(asset: IAssetCreateDTO): Promise<void>;
}