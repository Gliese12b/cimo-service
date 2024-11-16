/**==============================================
 * !                  WARNING
 *   THIS FILE IS USED ONLY FOR MIKRO CLI.
 * OTHER CONFIGS MUST BE IN `database.module.ts`.
 *=============================================**/
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
import { PinoLogger } from 'nestjs-pino';
import readline from 'readline';

const logger = new PinoLogger({ pinoHttp: { transport: { target: 'pino-pretty' } } });
const configService = new ConfigService();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askQuestion(question: string) {
  return new Promise<string>((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

export class CustomTsMigrationGenerator extends TSMigrationGenerator {
  createStatement(sql: string, padLeft: number): string {
    if (this.isString(sql)) {
      sql = normalizeMigrationSQL(sql);
    }

    return super.createStatement(sql, padLeft);
  }
  isString(val: any): val is string {
    return val != null && typeof val === 'string';
  }
}

async function main() {
  const command = process.argv.reverse()[0];
  let input: string;

  if (command === 'mikro:migrate') {
    while (!(input = await askQuestion('Name of migration: ')));
  }

  const mikroOrmConfig: Options = {
    clientUrl: configService.get<string>('DATABASE_URL'),
    driver: PostgreSqlDriver,
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    migrations: {
      tableName: '__mikro_migrations',
      fileName(timestamp, _name) {
        const migrationName = input?.split(/\s+/).join('_') || _name;
        const fileName = `${timestamp}_${migrationName}`;
        logger.info(`Create migration successfully: ${fileName}\n`);
        logger.info('NOTE: To apply migration, please use command: pnpm mikro:migrate-up');
        return fileName;
      },
      generator: CustomTsMigrationGenerator,
    },
  };
  rl.close();

  return mikroOrmConfig;
}

export default main();

export function normalizeMigrationSQL(sql: string) {
  sql = sql.replace(/create table (?!if not exists)/g, 'create table if not exists ');
  sql = sql.replace(/alter table (?!if exists)/g, 'alter table if exists ');
  sql = sql.replace(/create index (?!if not exists)/g, 'create index if not exists ');
  sql = sql.replace(/alter index (?!if exists)/g, 'alter index if exists ');
  sql = sql.replace(/drop index (?!if exists)/g, 'drop index if exists ');
  sql = sql.replace(/create unique index (?!if not exists)/g, 'create unique index if not exists ');
  sql = sql.replace(/drop unique index (?!if exists)/g, 'drop unique index if exists ');
  sql = sql.replace(/add column (?!if not exists)/g, 'add column if not exists ');
  sql = sql.replace(/drop column (?!if exists)/g, 'drop column if exists ');
  sql = sql.replace(/drop constraint (?!if exists)/g, 'drop constraint if exists ');

  return sql;
}
