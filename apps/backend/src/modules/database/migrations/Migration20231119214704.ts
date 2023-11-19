import { Migration } from '@mikro-orm/migrations';

export class Migration20231119214704 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "class" alter column "owner_id" type varchar(255) using ("owner_id"::varchar(255));',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "class" alter column "owner_id" type int using ("owner_id"::int);',
    );
  }
}
