import { Migration } from '@mikro-orm/migrations';

export class Migration20231216030506 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "class" alter column "code" drop default;');
    this.addSql('alter table "class" alter column "code" type varchar(6) using ("code"::varchar(6));');

    this.addSql('alter table "post" rename column "author" to "author_id";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "class" alter column "code" type varchar(6) using ("code"::varchar(6));');
    this.addSql('alter table "class" alter column "code" set default \'0l8g3w\';');

    this.addSql('alter table "post" rename column "author_id" to "author";');
  }

}
