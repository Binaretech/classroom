import { Migration } from '@mikro-orm/migrations';

export class Migration20240217025828 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "file" drop constraint "file_classwork_id_foreign";',
    );
    this.addSql('alter table "file" drop constraint "file_post_id_foreign";');

    this.addSql(
      'alter table "file" alter column "classwork_id" type int using ("classwork_id"::int);',
    );
    this.addSql(
      'alter table "file" alter column "classwork_id" drop not null;',
    );
    this.addSql(
      'alter table "file" alter column "post_id" type int using ("post_id"::int);',
    );
    this.addSql('alter table "file" alter column "post_id" drop not null;');
    this.addSql(
      'alter table "file" add constraint "file_classwork_id_foreign" foreign key ("classwork_id") references "classwork" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "file" add constraint "file_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete set null;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "file" drop constraint "file_classwork_id_foreign";',
    );
    this.addSql('alter table "file" drop constraint "file_post_id_foreign";');

    this.addSql(
      'alter table "file" alter column "classwork_id" type int using ("classwork_id"::int);',
    );
    this.addSql('alter table "file" alter column "classwork_id" set not null;');
    this.addSql(
      'alter table "file" alter column "post_id" type int using ("post_id"::int);',
    );
    this.addSql('alter table "file" alter column "post_id" set not null;');
    this.addSql(
      'alter table "file" add constraint "file_classwork_id_foreign" foreign key ("classwork_id") references "classwork" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "file" add constraint "file_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade;',
    );
  }
}
