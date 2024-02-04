import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { QuizQuestion } from './quizQuestion';

@Entity()
export class QuestionOption {
  @PrimaryKey()
  id: number;

  @Property()
  option: string;

  @Property()
  isCorrect?: boolean;

  @ManyToOne(() => QuizQuestion)
  question: QuizQuestion;
}
