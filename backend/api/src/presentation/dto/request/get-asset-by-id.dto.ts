import { IsString, IsNotEmpty } from 'class-validator';
import { IGetAssetByIdDTO } from 'src/domain/interfaces/dto/request/get-asset-by-id.dto.interface';

export class GetAssetByIdDTO implements IGetAssetByIdDTO {
  @IsString({ 
    message: 'The ID must be a valid string' 
  })
  @IsNotEmpty({ 
    message: 'The asset ID is required' 
  })
  id: string;
}