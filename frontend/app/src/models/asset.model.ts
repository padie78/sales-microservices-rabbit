export interface Asset {
  assetId: string;
  filename: string;
  area: number;
  center: [number, number]; // [lat, lon]
  processedAt: string;
}