import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQAssetReceiver } from './infrastructure/messaging/asset.receiver';
import { ProcessAssetUseCase } from './application/use-cases/process-asset.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './infrastructure/schemas/asset.schema';
import { AssetMongoRespository } from './infrastructure/repositories/asset.mongo.repository';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisAdapter } from './infrastructure/cache/redis.adapter';
import { FileStorageService } from './infrastructure/services/file-storage.service';

@Module({
  imports: [
    // Database: MongoDB connection with administrative authentication
    MongooseModule.forRoot('mongodb://admin:admin123@mongo:27017/geospatial_metadata?authSource=admin'),
    
    // Register the Asset schema for injection within the persistence layer
    MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }]),
    
    // Cache & Lock Management: Redis configuration with retry strategy
    RedisModule.forRoot({
      type: 'single',
      url: `redis://redis:6379`,
      options: {
        connectTimeout: 10000, // 10-second timeout for Docker network stability
        retryStrategy: (times) => Math.min(times * 50, 2000), // Incremental backoff for retries
      },
    }),
    
    // Messaging: RabbitMQ Client registration for event-driven communication
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'asset_processing_queue',
          queueOptions: {
            durable: true, // Ensure the queue survives broker restarts
          },
        },
      },
    ]),
  ],
  controllers: [
    // Entry point for incoming RabbitMQ messages
    RabbitMQAssetReceiver
  ],
  providers: [
    // Infrastructure Services
    FileStorageService,
    
    // Dependency Injection: Mapping interfaces to concrete implementations (Adapters/Repositories)
    {
      provide: 'ICacheService',
      useClass: RedisAdapter,
    },
    { 
      provide: 'IProcessAssetUseCase', 
      useClass: ProcessAssetUseCase,
    },
    { 
      provide: 'IAssetRepository', 
      useClass: AssetMongoRespository 
    },
  ],  
})
export class AppModule {}