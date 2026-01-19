export interface IAssetResponseDTO {
  assetId: string;
  filename: string;
  area: number;
  center: [number, number]; // Tupla [longitud, latitud]
  processedAt: Date;
}
