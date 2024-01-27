import { Migration } from '@mikro-orm/migrations';

export class Migration20240124024614 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "invitation" ("id" serial primary key, "invited_email" varchar(255) not null, "status" smallint not null, "class_id" bigint not null);');

    this.addSql('alter table "invitation" add constraint "invitation_class_id_foreign" foreign key ("class_id") references "class" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "invitation" cascade;');
  }

}
