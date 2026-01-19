import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Asset, AssetSchema } from './infrastructure/schemas/asset.schema';
import { AssetController } from './presentation/controllers/asset.controller';
import { GetAssetByIdUseCase } from './application/use-cases/get-asset-byid.usecase';
import { GetAssetsUseCase } from './application/use-cases/get-assets.usecase';
import { SearchAssetsWithinUseCase } from './application/use-cases/search-assets-within';
import { AssetMongoRepository } from './infrastructure/repositories/asset.mongo.repository';
import { RedisAdapter } from './infrastructure/cache/redis.adapter';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:admin123@mongo:27017/geospatial_metadata?authSource=admin'),
    MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }]),
    RedisModule.forRoot({
      type: 'single',
      url: `redis://redis:6379`,
      options: {
        connectTimeout: 10000,
        retryStrategy: (times) => Math.min(times * 50, 2000),
      },
    }),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin123@rabbit:5672'],
          queue: 'create_asset',
          noAck: false,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AssetController],
  providers: [
    {
      provide: 'ICacheService', // El token que usará Nest
      useClass: RedisAdapter,
    },
    {
      provide: 'IGetAssetByIdUseCase',
      useClass: GetAssetByIdUseCase,
    },
    {
      provide: 'IGetAssetsUseCase',
      useClass: GetAssetsUseCase,
    },
    {
      provide: 'ISearchAssetsWithinUseCase',
      useClass: SearchAssetsWithinUseCase,
    },
    {
      provide: 'IAssetRepository',
      useClass: AssetMongoRepository,
    },
  ],
  exports: []
})
export class AppModule {}
