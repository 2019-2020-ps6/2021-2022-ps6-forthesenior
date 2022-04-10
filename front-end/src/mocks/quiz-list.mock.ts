import {Quiz} from '../models/quiz.model';
import {Question} from '../models/question.model';
import {Theme} from "../models/theme.model";

export const QUESTION_ACTOR: Question = {
  id: '1',
  label: 'Jean Gabin a joué dans...',
  answers: [
    {
      value: 'Les tuches II',
      isCorrect: false,
    },
    {
      value: 'La grande illusion',
      isCorrect: true,
    }
  ]
};

export const QUIZ_LIST: Quiz[] = [
  {
    id: '1',
    name: 'Les Acteurs', // What's happening if I change this value..?
    theme: 'Actor',
    questions: [],
  },
  {
    id: '2',
    name: 'Les technos WEB',
    questions: [],
    theme: 'les acteurs',
  }
];

export const THEME_LIST: Theme[] = [
  {
    id: '1',
    name: 'Les animaux',
    quizzes: []
  }
];
