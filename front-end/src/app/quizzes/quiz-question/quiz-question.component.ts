import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../../models/question.model";

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss']
})
export class QuizQuestionComponent implements OnInit {

  @Input()
  question: Question;

  constructor() { }

  ngOnInit(): void {
  }


}
