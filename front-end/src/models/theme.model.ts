import { Question } from './question.model';

export interface Theme {
    id: string;
    name: string;
    quizzes: Theme[];
}
