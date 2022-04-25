import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from 'src/models/quiz.model';
import {QuizService} from 'src/services/quiz.service';
import {Router} from "@angular/router";
import {urlPopN} from "../../utils/functions";

@Component({
  selector: 'app-quiz-theme',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  @Input() public quiz: Quiz;

  constructor(private quizService: QuizService, private router: Router) {
    this.quizService.quizSelected$.asObservable().subscribe((quiz) => {
      this.quiz = quiz;
    })
  }

  ngOnInit(): void {
  }

  validate() {
    this.router.navigate([urlPopN(this.router.url, 2)]);
  }
}
