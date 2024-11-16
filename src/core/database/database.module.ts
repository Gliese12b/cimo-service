import { ConfigService } from '@/configs';
import { Platform, TextType, Type } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        ({
          clientUrl: config.databaseUrl,
          driver: PostgreSqlDriver,
          entities: ['dist/**/*.entity.js'],
          entitiesTs: ['src/**/*.entity.ts'],
          debug: true,
          metadataProvider: TsMorphMetadataProvider,
          extensions: [Migrator], // It is included by default
          discovery: {
            getMappedType(type: string, platform: Platform) {
              // override the mapping for string properties only
              if (type === 'string') {
                return Type.getType(TextType);
              }

              return platform.getDefaultMappedType(type);
            },
          },
          metadataCache: { pretty: true },
          // logger: (message: string) => myLogger.info(message)
          // highlighter: new SqlHighlighter(),
          // autoJoinOneToOneOwner: false,
        }) satisfies Options,
    }),
  ],
  exports: [MikroOrmModule],
})
export class DatabaseModule {}
