import {Quiz} from "./quiz.model";

export interface Theme {
  id: string;
  themeLabel: string;
  quizzes: Quiz[];
}
