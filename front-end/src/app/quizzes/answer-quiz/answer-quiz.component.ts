import {Component, Input, OnInit} from '@angular/core';
import {Answer} from '../../../models/question.model';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-answer-quiz',
  templateUrl: './answer-quiz.component.html',
  styleUrls: ['./answer-quiz.component.scss']
})
export class AnswerQuizComponent implements OnInit {
  @Input()
  answer: Answer;

  buttonColor = '#E0DAD8'; // Default Color

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  showAnswer(): void {
    if (this.answer.isCorrect){
      this.buttonColor = '#04FF00';
    }
    else {
      this.buttonColor = '#FF4000'; // desired Color
    }
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/result/' + id]);
  }
}
