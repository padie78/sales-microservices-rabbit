import { IAssetCreateDTO } from "../dto/create/asset.create.dto.interface";

export interface IHandleAssetUploadUseCase {
  execute(assetCreateDTO: IAssetCreateDTO, fileContext: { filename: string; fullPath: string }): Promise<void>;
}