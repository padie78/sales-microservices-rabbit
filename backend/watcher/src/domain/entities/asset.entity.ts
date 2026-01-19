import { IAsset } from "../interfaces/entities/asset.entity.interface";

/**
 * Domain Entity representing the metadata of an asset.
 * This class ensures that the raw data is encapsulated into a formal structure
 * for the domain layer.
 */
export class Asset implements IAsset {
  constructor(
    /** Original name of the uploaded file */
    public readonly filename: string,
    
    /** Absolute system path where the file is stored */
    public readonly fullPath: string,
    
    /** Timestamp of when the file was received by the system */
    public readonly receivedAt: Date 
  ) {}
}