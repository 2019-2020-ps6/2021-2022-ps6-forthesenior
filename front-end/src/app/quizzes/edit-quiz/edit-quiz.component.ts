import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from 'src/models/quiz.model';
import {QuizService} from 'src/services/quiz.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-quiz-theme',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  @Input() public quiz: Quiz;

  constructor(private quizService: QuizService, private router: Router) {
  }

  ngOnInit(): void {
  }

  validate() {
    let urlRoutes = this.router.url.split('/');
    urlRoutes.pop();
    urlRoutes.pop();
    this.router.navigate([urlRoutes.join('/')]);
  }
}
