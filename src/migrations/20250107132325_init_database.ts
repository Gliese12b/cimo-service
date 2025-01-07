import { Migration } from '@mikro-orm/migrations';

export class Migration20250107132325_init_database extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create schema if not exists "admin";`);
    this.addSql(`create table if not exists "admin"."media" ("id" uuid not null, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "created_by_id" uuid not null, "updated_by_id" uuid not null, "is_deleted" boolean not null default false, "file_name" text not null, "file_size" numeric(2,0) not null, "file_url" text not null, "file_type" text not null, constraint "media_pkey" primary key ("id"));`);

    this.addSql(`create table if not exists "admin"."user" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) not null default now(), "created_by_id" uuid not null, "updated_by_id" uuid not null, "is_deleted" boolean not null default false, "first_name" varchar(128) not null, "last_name" varchar(128) not null, "full_name" varchar(255) not null, "middle_name" varchar(128) null, "alias" varchar(255) null, "username" varchar(255) not null, "password" varchar(512) not null, "email" varchar(255) null, constraint "user_pkey" primary key ("id"));`);
    this.addSql(`alter table if exists "admin"."user" add constraint "user_username_unique" unique ("username");`);
  }

}
