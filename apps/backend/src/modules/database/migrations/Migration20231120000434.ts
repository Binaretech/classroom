import { Migration } from '@mikro-orm/migrations';

export class Migration20231120000434 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "class" add constraint "class_code_unique" unique ("code");');

    this.addSql('alter table "section" add column "code" varchar(64) not null;');
    this.addSql('alter table "section" add constraint "section_code_unique" unique ("code");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "class" drop constraint "class_code_unique";');

    this.addSql('alter table "section" drop constraint "section_code_unique";');
    this.addSql('alter table "section" drop column "code";');
  }

}
