import { Inject, Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IAsset } from '../../domain/interfaces/entities/asset.entity.interface';

@Injectable()
export class RabbitMQAssetPublisher implements OnModuleInit {
  private readonly logger = new Logger(RabbitMQAssetPublisher.name);

  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy
  ) {}

  /**
   * Initializes the connection to the RabbitMQ broker when the module starts.
   */
  async onModuleInit() {
    try {
      await this.client.connect();
      this.logger.log('Successfully connected to RabbitMQ');
    } catch (err) {
      this.logger.error('Failed to connect to RabbitMQ:', err);
      throw new Error('RabbitMQ connection failed');
    }  
  }

  /**
   * Publishes the asset metadata to the 'create_asset' queue.
   * @param assetMetadata The mapped asset entity to be processed.
   */
  async publish(assetMetadata: IAsset): Promise<void> {
    try {
      // Emits an asynchronous event to the message broker
      const result = await this.client.emit('create_asset', assetMetadata).toPromise();
      return result;
    } catch (err) {
      this.logger.error('Error sending message to RabbitMQ:', err);
      throw new Error('RabbitMQ communication failed');
    }  
  }
}