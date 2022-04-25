import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Answer} from '../models/answer.model';
import {HttpClient} from '@angular/common/http';
import {httpOptionsBase} from '../configs/server.config';
import {Router} from "@angular/router";
import {QuestionService} from "./question.service";


@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  public answerSelected$: Subject<Answer> = new Subject();
  public answers$: BehaviorSubject<Answer[]> = new BehaviorSubject([]);
  private answers: Answer[] = [];
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private router: Router, private questionService: QuestionService) {
    this.retrieveAnswers();
  }

  retrieveAnswers(): void {
    if (!this.getAnswerUrl().includes('undefined')) {
      this.http.get<Answer[]>(this.getAnswerUrl()).subscribe((answerList) => {
        this.answers = answerList;
        this.answers$.next(this.answers);
      });
    }
  }

  addAnswer(answer: Answer): void {
    this.http.post<Answer>(this.getAnswerUrl(), answer, this.httpOptions).subscribe(() => this.retrieveAnswers());
  }

  setSelectedAnswer(answerId: string): void {
    this.http.get<Answer>(this.getAnswerUrl() + '/' + answerId).subscribe((answer) => {
      this.answerSelected$.next(answer);
    });
  }

  deleteAnswer(answer: Answer): void {
    this.http.delete<Answer>(this.getAnswerUrl() + '/' + answer.id, this.httpOptions).subscribe(() => this.retrieveAnswers());
  }

  getAnswerUrl(): string {
    return this.questionService.getQuestionUrl() + '/' + this.getQuestionIdFromUrl() + '/answers';
  }

  getQuestionIdFromUrl(): string {
    return this.router.url.split('/')[11];
  }
}
