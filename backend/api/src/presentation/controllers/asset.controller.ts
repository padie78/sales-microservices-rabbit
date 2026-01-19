import { Controller, Get, Param, Query, NotFoundException, Inject } from '@nestjs/common';
import { IGetAssetByIdUseCase } from 'src/domain/interfaces/use-cases/get-asset-byid.usecase.inteface';
import { IGetAssetsUseCase } from 'src/domain/interfaces/use-cases/get-assets.usecase.interface';
import { ISearchAssetsWithinUseCase } from 'src/domain/interfaces/use-cases/search-assets-within.interface';
import { AssetMapper } from 'src/shared/mappers/asset.mapper';
import { IAssetController } from 'src/domain/interfaces/controllers/asset-controller.interface';
import { IAssetResponseDTO } from 'src/domain/interfaces/dto/response/asset.response.dto.interface';
import { IGetAssetByDateDTO } from 'src/domain/interfaces/dto/request/get-assets-by-date.dto.interface';
import { IGetAssetByWithinDTO } from 'src/domain/interfaces/dto/request/get-assets-by-within.dto.interface';

@Controller('assets')
export class AssetController implements IAssetController {
  constructor(
    @Inject('IGetAssetsUseCase') private readonly getAssetsUseCase: IGetAssetsUseCase,
    @Inject('IGetAssetByIdUseCase') private readonly getAssetByIdUseCase: IGetAssetByIdUseCase,
    @Inject('ISearchAssetsWithinUseCase') private readonly searchAssetsWithinUseCase: ISearchAssetsWithinUseCase,
  ) { }

  /**
   * GET /assets?date=YYYY-MM-DD
   * Retrieves all assets, optionally filtered by capture date.
   */
  @Get()
  async getAll(@Query() query: IGetAssetByDateDTO): Promise<IAssetResponseDTO[]> {
    console.log('GET /assets - Filter date:', query.date);
    const assets = await this.getAssetsUseCase.execute(query.date);

    // If the resulting list is empty, throw a 404 exception
    if (!assets || assets.length === 0) {
      throw new NotFoundException(`No assets found for date: ${query.date || 'all'}`);
    }

    // Map domain entities to response DTOs
    return assets.map(asset => AssetMapper.toDto(asset));
  }

  /**
   * GET /assets/within?minLat
   * Performs a spatial search based on a Bounding Box range.
   */
  @Get('within')
  async getByWithin(@Query() query: IGetAssetByWithinDTO): Promise<IAssetResponseDTO[]> {
    console.log('GET /assets/within - Bounding Box search');
    const assets = await this.searchAssetsWithinUseCase.execute(
      query.minLat,
      query.minLon,
      query.maxLat,
      query.maxLon
    );

    // Throw 404 if no assets fall within the specified geographical area
    if (!assets || assets.length === 0) {
      throw new NotFoundException(`No assets found in the specified Bounding Box area`);
    }
    return assets.map(asset => AssetMapper.toDto(asset));
  }

  /**
   * GET /assets/:id
   * Retrieves a single asset by its unique identifier.
   */
  @Get(':id')
  async getById(@Param('id') id: string): Promise<IAssetResponseDTO> {
    console.log(`GET /assets/${id} - Get by ID`);
    const asset = await this.getAssetByIdUseCase.execute(id);

    // Safety check: throw 404 if the asset does not exist
    if (!asset) {
      throw new NotFoundException(`Asset with ID ${id} not found`);
    }
    return AssetMapper.toDto(asset);
  }
}