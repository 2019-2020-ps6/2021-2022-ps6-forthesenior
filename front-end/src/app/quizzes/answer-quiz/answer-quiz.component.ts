import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Answer} from '../../../models/question.model';
import {ActivatedRoute, Router} from '@angular/router';
import {OptionService} from "../../../services/option.service";

@Component({
  selector: 'app-answer-quiz',
  templateUrl: './answer-quiz.component.html',
  styleUrls: ['./answer-quiz.component.scss']
})
export class AnswerQuizComponent implements OnInit, OnChanges {
  @Input()
  answer: Answer;
  @Input()
  answered: boolean;

  @Output()
  answeredQuestion: EventEmitter<boolean> = new EventEmitter<boolean>();

  /*buttonColor = '#faf8f3'; // Default Color
  vert = '#77AD71';
  rouge = '#A9362F';*/

  buttonColor : string;
  vert : string;
  rouge : string;

  constructor(private optionService : OptionService) {
    if (this.optionService.theme){
      this.buttonColor = '#6b7070'; // Default Color
      this.vert = '#53794f';
      this.rouge = '#762520';
    } else {
      this.buttonColor = '#faf8f3'; // Default Color
      this.vert = '#77AD71';
      this.rouge = '#A9362F';
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.answer.isCorrect && this.answered){
      this.buttonColor = this.vert;
    }
  }

  showAnswer(): void {
    if (!this.answered) {
      this.buttonColor = (this.answer.isCorrect) ? this.vert : this.rouge;
      this.answeredQuestion.emit(this.answer.isCorrect);
    }
  }
}
