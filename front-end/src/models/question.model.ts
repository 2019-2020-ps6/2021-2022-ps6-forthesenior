import {Answer} from "./answer.model";

export interface Question {
  id: string;
  questionLabel: string;
  answers: Answer[];
}
