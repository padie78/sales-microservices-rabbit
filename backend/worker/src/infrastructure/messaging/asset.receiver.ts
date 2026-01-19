import { Controller, Inject, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { IProcessAssetUseCase } from '../../domain/interfaces/use-cases/process-asset.usecase.interface';
import { IAssetCreateDTO } from 'src/domain/interfaces/dto/create/asset.create.dto.interface';
import { AssetMapper } from 'src/shared/mappers/asset.mapper';

@Controller()
export class RabbitMQAssetReceiver {
  private readonly logger = new Logger(RabbitMQAssetReceiver.name);

  constructor(
    @Inject('IProcessAssetUseCase') private readonly processAssetUseCase: IProcessAssetUseCase
  ) {}

  /**
   * Listens to the 'create_asset' pattern from RabbitMQ
   */
  @EventPattern('create_asset')
  async handleCreateAsset(@Payload() data: any, @Ctx() context: RmqContext) {
    // Obtain the channel and the original message for manual acknowledgement
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      // Step 1: Map the incoming raw payload to a structured DTO
      const assetDto: IAssetCreateDTO = AssetMapper.toDto(data);
      
      this.logger.log(`Processing asset DTO: ${assetDto.filename}`);
      this.logger.log(`Processing asset from: ${data.fullPath}`);
      
      // Step 2: Invoke the Business Logic/Use Case (File reading and BBox validation)
      await this.processAssetUseCase.execute(assetDto);

      // Step 3: Successfully acknowledge the message to remove it from the queue
      channel.ack(originalMsg);
      this.logger.log(`Message acknowledged`);

    } catch (error) {
      this.logger.error(`Processing error: ${error.message}`);
      channel.nack(originalMsg, false, false); 
    }
  }
}