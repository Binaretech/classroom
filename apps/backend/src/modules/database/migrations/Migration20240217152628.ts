import { Migration } from '@mikro-orm/migrations';

export class Migration20240217152628 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "classwork" add column "user_id" varchar(255) not null, add column "created_at" timestamptz(0) not null, add column "updated_at" timestamptz(0) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "classwork" drop column "user_id";');
    this.addSql('alter table "classwork" drop column "created_at";');
    this.addSql('alter table "classwork" drop column "updated_at";');
  }

}
