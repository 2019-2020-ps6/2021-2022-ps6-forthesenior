import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../../../../models/quiz.model';
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Output()
  playQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  editQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  deleteQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  play(): void {
    this.playQuiz.emit(this.quiz);
  }

  edit(): void {
    this.editQuiz.emit(this.quiz);
  }

  delete(): void {
    this.deleteQuiz.emit(this.quiz);
  }

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }
}
