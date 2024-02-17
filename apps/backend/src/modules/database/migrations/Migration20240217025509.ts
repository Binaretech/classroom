import { Migration } from '@mikro-orm/migrations';

export class Migration20240217025509 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "classwork" alter column "title" type varchar(255) using ("title"::varchar(255));',
    );
    this.addSql('alter table "classwork" alter column "title" drop not null;');
    this.addSql(
      'alter table "classwork" alter column "description" type varchar(255) using ("description"::varchar(255));',
    );
    this.addSql(
      'alter table "classwork" alter column "description" drop not null;',
    );

    this.addSql('alter table "file" drop column "type";');
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "classwork" alter column "title" type varchar(255) using ("title"::varchar(255));',
    );
    this.addSql('alter table "classwork" alter column "title" set not null;');
    this.addSql(
      'alter table "classwork" alter column "description" type varchar(255) using ("description"::varchar(255));',
    );
    this.addSql(
      'alter table "classwork" alter column "description" set not null;',
    );

    this.addSql('alter table "file" add column "type" varchar(255) not null;');
  }
}
