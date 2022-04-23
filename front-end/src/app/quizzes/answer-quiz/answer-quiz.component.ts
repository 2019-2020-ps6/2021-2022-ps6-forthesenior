import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

  buttonColor = 'rgba(224,216,216,0.5)'; // Default Color
  vert = '#00ff00';
  rouge = '#ff0000';

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.answer.isCorrect && this.answered) {
      this.buttonColor = '#00ff00';
    }
  }

  showAnswer(): void {
    if (!this.answered) {
      this.buttonColor = (this.answer.isCorrect) ? this.vert : this.rouge;
      this.answeredQuestion.emit(this.answer.isCorrect);
    }
  }
}
