import { Migration } from '@mikro-orm/migrations';

export class Migration20240203005217 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "classwork" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "type" text check ("type" in (\'Material\', \'Assignment\')) not null, "class_id" bigint not null);',
    );

    this.addSql(
      'create table "file" ("id" serial primary key, "path" varchar(255) not null, "mimetype" varchar(255) not null, "type" varchar(255) not null, "classwork_id" int not null, "post_id" int not null);',
    );

    this.addSql(
      'create table "quiz" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "due_date" timestamptz(0) null, "max_attempts" int not null, "time_limit" int not null, "classwork_id" int not null);',
    );

    this.addSql(
      'create table "quiz_question" ("id" serial primary key, "question" varchar(255) not null, "type" text check ("type" in (\'MultipleChoice\', \'FreeText\')) not null, "quiz_id" int not null);',
    );

    this.addSql(
      'create table "question_option" ("id" serial primary key, "option" varchar(255) not null, "is_correct" boolean null, "question_id" int not null);',
    );

    this.addSql(
      'alter table "classwork" add constraint "classwork_class_id_foreign" foreign key ("class_id") references "class" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "file" add constraint "file_classwork_id_foreign" foreign key ("classwork_id") references "classwork" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "file" add constraint "file_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "quiz" add constraint "quiz_classwork_id_foreign" foreign key ("classwork_id") references "classwork" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "quiz_question" add constraint "quiz_question_quiz_id_foreign" foreign key ("quiz_id") references "quiz" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "question_option" add constraint "question_option_question_id_foreign" foreign key ("question_id") references "quiz_question" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "file" drop constraint "file_classwork_id_foreign";',
    );

    this.addSql(
      'alter table "quiz" drop constraint "quiz_classwork_id_foreign";',
    );

    this.addSql(
      'alter table "quiz_question" drop constraint "quiz_question_quiz_id_foreign";',
    );

    this.addSql(
      'alter table "question_option" drop constraint "question_option_question_id_foreign";',
    );

    this.addSql('drop table if exists "classwork" cascade;');

    this.addSql('drop table if exists "file" cascade;');

    this.addSql('drop table if exists "quiz" cascade;');

    this.addSql('drop table if exists "quiz_question" cascade;');

    this.addSql('drop table if exists "question_option" cascade;');
  }
}
