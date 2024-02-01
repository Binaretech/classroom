import { Migration } from '@mikro-orm/migrations';

export class Migration20240130000843 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "class" alter column "code" type varchar(7) using ("code"::varchar(7));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "class" alter column "code" type varchar(6) using ("code"::varchar(6));');
  }

}
