import { combineSchemas } from '@/utils';
import { Global, Module } from '@nestjs/common';
import { ConfigFactory, ConfigModule as NestConfigModule } from '@nestjs/config';
import { apiConfig, apiConfigSchema } from './api';
import { appConfig, appConfigSchema } from './app';
import { ConfigService } from './config.service';

const configs: ConfigFactory[] = [appConfig, apiConfig];
const validationSchema = combineSchemas(appConfigSchema, apiConfigSchema);

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: configs,
      validationSchema: validationSchema,
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
      validate: (config) => {
        return validationSchema.parse(config);
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
