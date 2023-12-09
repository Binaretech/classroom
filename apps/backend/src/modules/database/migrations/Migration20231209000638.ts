import { Migration } from '@mikro-orm/migrations';

export class Migration20231209000638 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "class" ("id" bigserial primary key, "name" varchar(64) not null, "description" varchar(255) null, "section" varchar(255) null, "code" varchar(6) null default \'w9xs6y\', "owner_id" varchar(255) not null, "archived" boolean not null default false, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
  }

}
