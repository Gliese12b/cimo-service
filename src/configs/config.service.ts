import { Inject, Injectable } from '@nestjs/common';
import { ApiConfig, apiConfig } from './api';
import { AppConfig, NodeEnv, appConfig } from './app';

@Injectable()
export class ConfigService {
  public readonly port: string | number;
  public readonly nodeEnv: NodeEnv;

  public readonly prefix: string;
  public readonly version: string;

  public readonly jwtSecret: string;
  public readonly apiKey: string;
  public readonly databaseUrl: string;

  constructor(@Inject(appConfig.KEY) appConfig: AppConfig, @Inject(apiConfig.KEY) apiConfig: ApiConfig) {
    this.port = appConfig.port;
    this.nodeEnv = appConfig.nodeEnv;
    this.databaseUrl = appConfig.databaseUrl;

    this.prefix = apiConfig.prefix;
    this.version = apiConfig.version;
  }
}
