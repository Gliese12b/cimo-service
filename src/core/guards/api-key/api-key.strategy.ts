import { ConfigService } from '@/configs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { timingSafeEqual } from 'crypto';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { ApiKeyGuardTypeKey } from './api-key.guard';

@Injectable()
export class ApiKeyPassportStrategy extends PassportStrategy(HeaderAPIKeyStrategy, ApiKeyGuardTypeKey) {
  private readonly keyBin: Buffer;

  constructor(private readonly config: ConfigService) {
    super(
      {
        header: 'X-API-KEY',
      },
      true,
      async (
        apiKey: string,
        done: (error: Error | undefined | null, data: { success: boolean } | undefined) => Record<string, unknown>,
      ) => this.validate(apiKey, done),
    );
    this.keyBin = Buffer.from(config.apiKey);
  }

  public validate = (apiKey: string, done: any) => {
    const actualApiKeyBuffer = Buffer.from(apiKey);

    if (actualApiKeyBuffer.length !== this.keyBin.length || !timingSafeEqual(actualApiKeyBuffer, this.keyBin)) {
      done(new UnauthorizedException('API KEY is not valid.'), undefined);
    }

    return done(null, { success: true });
  };
}
