import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './configs';
import { Logger } from 'nestjs-pino';
import { GlobalExceptionFilter } from './core';
import { ValidationPipe } from '@nestjs/common';
import { Swagger } from './shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix(config.prefix);
  app.enableVersioning();
  app.enableCors();
  // logger
  const logger = app.get(Logger);
  app.useLogger(logger);

  // swagger
  Swagger.setup(app);

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(3000);

  const url = await app.getUrl();
  logger.log(`Application is running on env: ${config.nodeEnv}. swagger: ${url}/${config.prefix}/swagger`);
}
bootstrap();
