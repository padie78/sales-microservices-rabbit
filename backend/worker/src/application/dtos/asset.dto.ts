export class AssetDTO {
  constructor(
    public readonly filename: string,
    public readonly fullPath: string,
    public readonly receivedAt: Date // Usamos Date en el dominio
  ) {}
}