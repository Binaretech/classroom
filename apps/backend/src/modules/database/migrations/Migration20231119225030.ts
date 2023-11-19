import { Migration } from '@mikro-orm/migrations';

export class Migration20231119225030 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "class" add column "code" varchar(64);');
    this.addSql('update "class" set "code" = \'\';');
    this.addSql('alter table "class" alter column "code" set not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "class" drop column "code";');
  }
}
