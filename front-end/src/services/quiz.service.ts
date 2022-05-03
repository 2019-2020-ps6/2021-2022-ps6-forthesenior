import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {Quiz} from '../models/quiz.model';
import {Question} from '../models/question.model';
import {serverUrl, httpOptionsBase} from '../configs/server.config';
import {Theme} from "../models/theme.model";
import {ThemeService} from "./theme.service";
import {OptionService} from "./option.service";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /*
   The list of theme.
   The list is retrieved from the mock.
   */
  private quizzes: Quiz[] = [];

  /*
   Observable which contains the list of the theme.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]>
    = new BehaviorSubject(null);

  // @ts-ignore
  public quizSelected$: BehaviorSubject<Quiz> = new BehaviorSubject<Quiz>(null);

  private quizUrl = serverUrl + '/theme/';
  private questionsPath = '/questions';

  private httpOptions = httpOptionsBase;
  private theme: Theme;
  private theme$: Theme;
  private idTheme: string;

  constructor(private http: HttpClient, public themeService: ThemeService, private optionService: OptionService) {
    /*this.themeService.themeSelected$.subscribe((theme) =>{
      this.theme=theme;
      //this.retrieveQuizzes();
    })*/
  }

  setIdTheme(idTheme: string) {
    this.idTheme = idTheme;
  }

  retrieveQuizzes(): void {
    const urlWithThemeId = this.quizUrl + this.idTheme + '/quizzes';
    this.http.get<Quiz[]>(urlWithThemeId).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  retrieveTheme(): void {
    const urlWithThemeId = this.quizUrl + this.idTheme;
    this.http.get<Theme>(urlWithThemeId).subscribe((theme) => {
      this.theme = theme;
      this.theme$ = this.theme;
    });
  }

  addQuiz(quiz: Quiz): void {
    this.http.post<Quiz>(this.quizUrl + this.idTheme + '/quizzes', quiz, this.httpOptions).subscribe(() => this.retrieveQuizzes());
  }

  setSelectedQuiz(id: string): void {
    const urlWithId = this.quizUrl + this.idTheme + '/quizzes/' + id;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }

  deleteQuiz(quiz: Quiz): void {
    const urlWithId = this.quizUrl + this.idTheme + '/quizzes/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.retrieveQuizzes());
  }

  addQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + this.idTheme + '/quizzes/' + quiz.id + '/questions';
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + this.idTheme + '/quizzes/' + quiz.id + '/questions/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }
}
