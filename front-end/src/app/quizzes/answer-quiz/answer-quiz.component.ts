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

  /*buttonColor = '#faf8f3'; // Default Color
  vert = '#77AD71';
  rouge = '#A9362F';*/

  buttonColor : string;
  vert : string;
  rouge : string;

  pathRight ="assets/right.png";
  altRight = "Right";

  pathWrong = "assets/wrong.png";
  altWrong = "Wrong";

  path: string;
  alt: string;

  option : Option;

  constructor(private optionService: OptionService, private quizPlay: QuizPlayComponent,
              private themeService : ThemeService) {
    /*if (this.optionService.theme){
      this.buttonColor = '#6b7070'; // Default Color
      /*this.vert = '#53794f';
      this.rouge = '#762520';
    } else {
      this.buttonColor = '#faf8f3'; // Default Color
      this.vert = '#77AD71';
      this.rouge = '#A9362F';
    }*/
  }

  ngOnInit(): void {
    this.path = null;
    this.optionService.options$.subscribe((option : Option[]) =>
      this.option = option[0]
    );
    if (this.optionService.theme) {
      this.buttonColor = '#6b7070'; // Default Color
      /*this.vert = '#53794f';
      this.rouge = '#762520';*/
    } else {
      this.buttonColor = '#faf8f3'; // Default Color
      this.vert = '#77AD71';
      this.rouge = '#A9362F';
    }
    this.quizPlay.answerList$.subscribe(next => {
      //console.log("observer " + next);
      if (next) {
        if (this.option.theme) {
          this.path = this.pathWrong;
          this.alt = this.altWrong;
        } else {
          this.buttonColor = (this.answer.isCorrect) ? this.vert : this.rouge;
        }
        this.answered = true;
      }
    })
  }

  showAnswer(): void {
    if (!this.answered) this.answeredQuestion.emit(this.answer.isCorrect);
  }
}
