import { IsNotEmpty, IsDateString } from 'class-validator';
import { IGetAssetByDateDTO } from 'src/domain/interfaces/dto/request/get-assets-by-date.dto.interface';

export class GetAssetByDateDto implements IGetAssetByDateDTO {
  @IsNotEmpty({ 
    message: 'The date field is required' 
  })
  @IsDateString({}, { 
    message: 'The date must be a valid ISO 8601 format (e.g., YYYY-MM-DD)' 
  })
  date: string;
}