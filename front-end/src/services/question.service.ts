import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Question} from '../models/question.model';
import {HttpClient} from '@angular/common/http';
import {httpOptionsBase} from '../configs/server.config';
import {Router} from "@angular/router";
import {QuizService} from "./quiz.service";


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  public questionSelected$: Subject<Question> = new Subject();
  public questions$: BehaviorSubject<Question[]> = new BehaviorSubject([]);
  private questions: Question[] = [];
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private router: Router, private quizService: QuizService) {
    this.retrieveQuestions();
  }

  retrieveQuestions(): void {
    if (!this.getQuestionUrl().includes('undefined')) {
      this.http.get<Question[]>(this.getQuestionUrl()).subscribe((questionList) => {
        this.questions = questionList;
        this.questions$.next(this.questions);
      });
    }
  }

  addQuestion(question: Question): void {
    this.http.post<Question>(this.getQuestionUrl(), question, this.httpOptions).subscribe(() => this.retrieveQuestions());
  }

  setSelectedQuestion(questionId: string): void {
    this.http.get<Question>(this.getQuestionUrl() + '/' + questionId).subscribe((question) => {
      this.questionSelected$.next(question);
    });
  }

  deleteQuestion(question: Question): void {
    this.http.delete<Question>(this.getQuestionUrl() + '/' + question.id, this.httpOptions).subscribe(() => this.retrieveQuestions());
  }

  getQuestionUrl(): string {
    return this.quizService.getQuizUrl() + '/' + this.getQuizIdFromUrl() + '/questions';
  }

  getQuizIdFromUrl(): string {
    return this.router.url.split('/')[9];
  }
}
