import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import {QUIZ_LIST, THEME_LIST} from '../mocks/quiz-list.mock';
import {Theme} from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /*
   The list of theme.
   The list is retrieved from the mock.
   */
  private themes: Theme[] = THEME_LIST;

  /*
   Observable which contains the list of the theme.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public themes$: BehaviorSubject<Theme[]>
    = new BehaviorSubject(this.themes);

  constructor() {
  }

  addTheme(theme: Theme): void {}

  deleteTheme(theme: Theme): void {
  }

  /*
  Note: The functions below don't interact with the server. It's an example of implementation for the exercice 10.
  addQuestion(theme: Quiz, question: Question) {
    theme.questions.push(question);
    const index = this.quizzes.findIndex((q: Quiz) => q.id === theme.id);
    if (index) {
      this.updateQuizzes(theme, index);
    }
  }

  deleteQuestion(theme: Quiz, question: Question) {
    const index = theme.questions.findIndex((q) => q.label === question.label);
    if (index !== -1) {
      theme.questions.splice(index, 1)
      this.updateQuizzes(theme, index);
    }
  }

  private updateQuizzes(theme: Quiz, index: number) {
    this.quizzes[index] = theme;
    this.quizzes$.next(this.quizzes);
  }
  */
}
