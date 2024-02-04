import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Collection,
  OneToMany,
  Enum,
} from '@mikro-orm/core';
import { Quiz } from './quiz';
import { QuestionOption } from './questionOption';

export enum QuestionType {
  MultipleChoice = 'MultipleChoice',
  FreeText = 'FreeText',
}

@Entity()
export class QuizQuestion {
  @PrimaryKey()
  id: number;

  @Property()
  question: string;

  @Enum(() => QuestionType)
  type: QuestionType;

  @ManyToOne(() => Quiz)
  quiz: Quiz;

  @OneToMany(() => QuestionOption, (option) => option.question)
  options = new Collection<QuestionOption>(this);
}
