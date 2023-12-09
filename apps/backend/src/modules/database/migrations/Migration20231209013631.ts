import { Migration } from '@mikro-orm/migrations';

export class Migration20231209013631 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "content" text not null, "author" varchar(255) not null, "updated_at" timestamptz(0) not null, "created_at" timestamptz(0) not null, "class_id" bigint not null);');

    this.addSql('alter table "post" add constraint "post_class_id_foreign" foreign key ("class_id") references "class" ("id") on update cascade;');

    this.addSql('alter table "class" alter column "code" type varchar(6) using ("code"::varchar(6));');
    this.addSql('alter table "class" alter column "code" set default \'0l8g3w\';');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "post" cascade;');

    this.addSql('alter table "class" alter column "code" type varchar(6) using ("code"::varchar(6));');
    this.addSql('alter table "class" alter column "code" set default \'w9xs6y\';');
  }

}
