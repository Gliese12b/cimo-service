import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { SharedModule } from './shared';

@Module({
  imports: [ConfigModule, SharedModule],
  controllers: [],
  providers: [ConfigService],
  exports: [],
})
export class AppModule {}
