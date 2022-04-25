import {Injectable} from '@angular/core';
import {QuizService} from "./quiz.service";


@Injectable({
  providedIn: 'root'
})
export class PlayService {

  public right = 0;
  public total = 0;
  public quizId;

  constructor(private quizService: QuizService) {
    this.quizService.quizSelected$.asObservable().subscribe((quiz) => this.quizId = quiz.id);
  }

}
