// src/infrastructure/cache/redis.adapter.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { ICacheService } from '../../domain/interfaces/cache/cache.interface';

@Injectable()
export class RedisAdapter implements ICacheService, OnModuleInit {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async onModuleInit() {
    await this.redis.ping();
  }

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.redis.set(key, value, 'EX', ttl);
    } else {
      await this.redis.set(key, value);
    }
  }

  async incr(key: string): Promise<number> {
    return await this.redis.incr(key);
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}