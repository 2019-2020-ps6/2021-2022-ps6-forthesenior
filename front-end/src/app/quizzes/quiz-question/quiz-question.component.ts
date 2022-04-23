import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Question} from '../../../models/question.model';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss']
})
export class QuizQuestionComponent implements OnInit, OnChanges {

  @Input()
  question: Question;

  @Output()
  next: EventEmitter<boolean> = new EventEmitter<boolean>();

  answered: boolean;

  constructor() {
    this.answered = false;
  }

  ngOnInit(): void {
    console.log("question "+this.question.label)
  }

  ngOnChanges(): void{
    this.answered = false;
  }

  onAnswered(questionAnswered: boolean): void{
    this.answered = true;
    this.next.emit(questionAnswered);
  }





}
