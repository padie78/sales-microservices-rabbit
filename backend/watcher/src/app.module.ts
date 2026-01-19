import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQAssetPublisher } from './infrastructure/messaging/asset.publisher';
import { FileWatcherService } from './infrastructure/file-watcher/watcher.service';
import { HandleAssetUploadUseCase } from './application/use-cases/handle-asset-upload.usecase';

@Module({
imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
    }),

    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const url = configService.get<string>('RABBITMQ_URL') || process.env.RABBITMQ_URL;
          const queue = configService.get<string>('RABBITMQ_QUEUE') || process.env.RABBITMQ_QUEUE;

          // Si el log anterior mostró la URL, este debería funcionar ahora
          return {
            transport: Transport.RMQ,
            options: {
              urls: [url],
              queue: queue,
              queueOptions: {
                durable: true,
              },
            },
          };
        },
      },
    ]),
  ],
  providers: [
    // Infrastructure service for publishing messages
    RabbitMQAssetPublisher,
    
    // Infrastructure service for monitoring the local file system
    FileWatcherService,
    
    /**
     * Application Layer: Use Case injection.
     * Using an interface token ('IHandleAssetUploadUseCase') to decouple 
     * the implementation from the consumer.
     */
    {
      provide: 'IHandleAssetUploadUseCase',
      useClass: HandleAssetUploadUseCase,
    },
  ],
  // Exporting the publisher in case other modules need to send messages
  exports: [RabbitMQAssetPublisher]
})
export class AppModule {}