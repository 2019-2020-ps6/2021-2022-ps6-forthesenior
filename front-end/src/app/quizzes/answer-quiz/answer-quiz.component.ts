import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OptionService} from "../../../services/option.service";
import {ThemeService} from "../../../services/theme.service";
import {Option} from "../../../models/option.model";
import {QuizPlayComponent} from "../quiz-play/quiz-play.component";
import {Answer} from "../../../models/answer.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-answer-quiz',
  templateUrl: './answer-quiz.component.html',
  styleUrls: ['./answer-quiz.component.scss']
})
export class AnswerQuizComponent implements OnInit {
  @Input() answer: Answer;
  @Input() answered: boolean;

  @Output()
  answeredQuestion: EventEmitter<boolean> = new EventEmitter<boolean>();

  buttonColor: string;
  vert: string;
  rouge: string;

  pathRight = "assets/right.png";
  altRight = "Right";

  pathWrong = "assets/wrong.png";
  altWrong = "Wrong";

  path: string;
  alt: string;

  option: Option;
  click = false;

  constructor(private optionService: OptionService, private quizPlay: QuizPlayComponent) {}

  ngOnInit(): void {
    this.path = null;
    this.optionService.options$.subscribe((option: Option[]) =>
      this.option = option[0]
    );
    if (this.optionService.theme) {
      this.buttonColor = '#6b7070'; // Default Color
    } else {
      this.buttonColor = '#faf8f3'; // Default Color
      this.vert = '#77AD71';
      this.rouge = '#A9362F';
    }
    this.quizPlay.answerList$.subscribe(next => {
      if (next) {
        if (this.option.theme) {
          if (this.answer.isCorrect) {
            this.path = this.pathRight;
            this.alt = this.altRight;
          } else if (this.click) {
            this.path = this.pathWrong;
            this.alt = this.altWrong;
          }
        } else {
          if (this.answer.isCorrect) {
            this.buttonColor = this.vert;
          } else if (this.click) {
            this.buttonColor = this.rouge;
          }
        }
        this.answered = true;
        this.click = false;
      }
    })
  }

  showAnswer(): void {
    if (!this.answered) {
      this.click = true;
      this.answeredQuestion.emit(this.answer.isCorrect);
    }
  }
}
