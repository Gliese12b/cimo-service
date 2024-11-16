import { ConfigType, registerAs } from '@nestjs/config';
import zod, { z } from 'zod';

const configKey = 'app';

export type NodeEnv = 'local' | 'development' | 'production';

export const appConfigSchema = zod.object({
  NODE_ENV: zod.union([z.literal('local'), z.literal('development'), z.literal('production')]).optional(),
  PORT: zod.number().or(zod.string()).default(3000).optional(),
  DATABASE_URL: zod.string(),
});

export const appConfig = registerAs(configKey, () => ({
  nodeEnv: (process.env.NODE_ENV || 'local') as NodeEnv,
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL,
}));

export type AppConfig = ConfigType<typeof appConfig>;
