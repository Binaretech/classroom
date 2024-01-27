import { Migration } from '@mikro-orm/migrations';

export class Migration20240126014403 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "invitation" add column "code" varchar(255) not null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "invitation" drop column "code";');
  }
}
