import { DatabaseModule } from '@/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SharedModule } from '@/shared';

@Module({
  imports: [ConfigModule, SharedModule, DatabaseModule],
  controllers: [],
  providers: [ConfigService],
  exports: [],
})
export class AppModule {}
