import { IAssetCreateDTO } from "../../domain/interfaces/dto/create/asset.create.dto.interface";
import { IAsset } from "../../domain/interfaces/entities/asset.entity.interface";

/**
 * Data Mapper for Asset-related objects.
 * Responsible for transforming raw data (DTOs) and system metadata 
 * into formal Domain Entities.
 */
export class AssetMapper {
  
  /**
   * Transforms input data and file system information into an Asset Domain Entity.
   * @param dto - The raw data transfer object extracted from the JSON file.
   * @param fileInfo - Contextual information provided by the File Watcher.
   * @returns A structured IAsset entity ready for domain logic and persistence.
   */
  static toEntity(dto: IAssetCreateDTO, fileInfo: { filename: string; fullPath: string }): IAsset {
    return {
      // The filename and path are provided by the file system watcher (fileInfo)
      filename: fileInfo.filename,
      fullPath: fileInfo.fullPath,
      
      /** * Converts the JSON timestamp into a native JavaScript Date object.
       * This ensures the domain layer works with typed dates rather than raw strings.
       */
      receivedAt: new Date(dto.timestamp), 
    };
  }
}