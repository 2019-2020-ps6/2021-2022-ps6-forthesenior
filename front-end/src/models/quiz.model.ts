import {Question} from './question.model';

export interface Quiz {
  id: string;
  quizLabel: string;
  questions: Question[];
}
