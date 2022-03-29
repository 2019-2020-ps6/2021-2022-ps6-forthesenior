import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer, Question} from '../../../models/question.model';

@Component({
  selector: 'app-answer-quiz',
  templateUrl: './answer-quiz.component.html',
  styleUrls: ['./answer-quiz.component.scss']
})
export class AnswerQuizComponent implements OnInit {
  @Input()
  answer: Answer;
  @Input()
  answered: boolean;

  @Output()
  answeredQuestion: EventEmitter<boolean> = new EventEmitter<boolean>();

  buttonColor = 'rgba(224,216,216,0.5)'; // Default Color

  constructor() { }

  ngOnInit(): void {
  }

  showAnswer(): void {
    if (!this.answered) {
      if (this.answer.isCorrect) {
        this.buttonColor = '#00ff00';
      } else {
        this.buttonColor = '#ff0000'; // desired Color
      }
      this.answeredQuestion.emit(true);
    }
  }
}
