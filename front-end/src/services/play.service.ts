import {Injectable} from '@angular/core';
import {QuizService} from "./quiz.service";
import {UserService} from "./user.service";
import {User} from "../models/user.model";
import {Quiz} from "../models/quiz.model";


@Injectable({
  providedIn: 'root'
})
export class PlayService {

  public outsideClick = 0;
  public right = 0;
  public total = 0;
  public user: User;
  public quiz: Quiz;

  constructor(private userService: UserService, private quizService: QuizService) {
    this.userService.userSelected$.asObservable().subscribe((user) => this.user = user);
    this.quizService.quizSelected$.asObservable().subscribe((quiz) => this.quiz = quiz);
  }
}
