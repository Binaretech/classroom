import { Migration } from '@mikro-orm/migrations';

export class Migration20231226014110 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "student" ("id" bigserial primary key, "user_id" varchar(64) not null, "class_id" bigint not null);');

    this.addSql('alter table "student" add constraint "student_class_id_foreign" foreign key ("class_id") references "class" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "student" cascade;');
  }

}
