import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Question} from '../../../models/question.model';
import {QuestionService} from "../../../services/question.service";

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

  @Output()
  outside : EventEmitter<boolean> = new EventEmitter<boolean>();

  inside = false;
  nbClick = 0;

  @HostListener("document:click")
  clickedOut() {

    if(!this.inside)
      this.outside.emit(true);
    this.inside = false;
  }

  answered: boolean;

  constructor(private questionService: QuestionService) {
    this.questionService.questionSelected$.asObservable().subscribe((question) => {
      this.question = question;
    })
    this.answered = false;
  }

  ngOnInit(): void {
    this.questionService.retrieveQuestions();
    this.shuffleAnswers();
  }

  ngOnChanges(): void {
    this.answered = false;
    this.shuffleAnswers();
  }

  onAnswered(questionAnswered: boolean): void {
    this.answered = true;
    this.next.emit(questionAnswered);
  }

  shuffleAnswers(): void {
    let answers = this.question.answers;
    answers.sort(() => Math.random() - 0.5);
  }
}
