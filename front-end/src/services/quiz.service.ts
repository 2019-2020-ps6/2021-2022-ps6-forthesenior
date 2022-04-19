import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {Quiz} from '../models/quiz.model';
import {Question} from '../models/question.model';
import {httpOptionsBase} from '../configs/server.config';
import {Router} from "@angular/router";
import {ThemeService} from "./theme.service";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  public quizSelected$: Subject<Quiz> = new Subject();
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject([]);
  private quizzes: Quiz[] = [];
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private router: Router, private themeService: ThemeService) {
    this.retrieveQuizzes();
  }

  retrieveQuizzes(): void {
    this.http.get<Quiz[]>(this.getQuizUrl()).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  addQuiz(quiz: Quiz): void {
    this.http.post<Quiz>(this.getQuizUrl(), quiz, this.httpOptions).subscribe(() => this.retrieveQuizzes());
  }

  setSelectedQuiz(quizId: string): void {
    this.http.get<Quiz>(this.getQuizUrl() + '/' + quizId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }

  deleteQuiz(quiz: Quiz): void {
    this.http.delete<Quiz>(this.getQuizUrl() + '/' + quiz.id, this.httpOptions).subscribe(() => this.retrieveQuizzes());
  }

  addQuestion(quiz: Quiz, question: Question): void {
    this.http.post<Question>(this.getQuizUrl() + '/' + quiz.id + '/questions', question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz: Quiz, question: Question): void {
    this.http.delete<Question>(this.getQuizUrl() + '/' + quiz.id + '/questions/' + question.id, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  getQuizUrl(): string {
    return this.themeService.getThemeUrl() + '/' + this.getThemeIdFromUrl() + '/quizzes';
  }

  getThemeIdFromUrl(): string {
    return this.router.url.split('/')[6];
  }
}
