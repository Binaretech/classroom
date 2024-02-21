import { Migration } from '@mikro-orm/migrations';

export class Migration20240218150447 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "file" add column "bucket" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "file" drop column "bucket";');
  }

}
