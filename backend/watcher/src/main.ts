import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.createApplicationContext(AppModule);
    const logger = new Logger('Bootstrap');
    logger.log('Watcher Microservice is initialized and monitoring...');
    app.enableShutdownHooks();

  } catch (error) {
    console.error('Failed to start the microservice:', error);
    process.exit(1);
  }
}
bootstrap();
