import { Migration } from '@mikro-orm/migrations';

export class Migration20231031033024 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "class" ("id" bigserial primary key, "name" varchar(64) not null, "description" varchar(255) null, "owner_id" int not null, "archived" boolean not null default false, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);',
    );

    this.addSql(
      'create table "section" ("id" bigserial primary key, "name" varchar(64) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);',
    );
  }
}
