import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Answer} from "../../../models/answer.model";

@Component({
  selector: 'app-answer-quiz',
  templateUrl: './answer-quiz.component.html',
  styleUrls: ['./answer-quiz.component.scss']
})
export class AnswerQuizComponent implements OnInit, OnChanges {
  @Input() answer: Answer;
  @Input() answered: boolean;

  @Output()
  answeredQuestion: EventEmitter<boolean> = new EventEmitter<boolean>();

  buttonColor = undefined
  vert = '#89ff89';
  rouge = '#f26465';

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.answer.isCorrect && this.answered) {
      this.buttonColor = this.vert
    }
  }

  showAnswer(): void {
    if (!this.answered) {
      this.buttonColor = (this.answer.isCorrect) ? this.vert : this.rouge;
      this.answeredQuestion.emit(this.answer.isCorrect);
    }
  }
}
