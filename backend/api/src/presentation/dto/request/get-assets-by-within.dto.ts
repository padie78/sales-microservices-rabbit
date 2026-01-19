import { IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAssetsByWithinDTO {
  @Type(() => Number)
  @IsNumber({}, { message: 'minLat must be a valid number' })
  @IsNotEmpty({ message: 'Minimum latitude (minLat) is required' })
  minLat: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'minLon must be a valid number' })
  @IsNotEmpty({ message: 'Minimum longitude (minLon) is required' })
  minLon: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'maxLat must be a valid number' })
  @IsNotEmpty({ message: 'Maximum latitude (maxLat) is required' })
  maxLat: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'maxLon must be a valid number' })
  @IsNotEmpty({ message: 'Maximum longitude (maxLon) is required' })
  maxLon: number;
}