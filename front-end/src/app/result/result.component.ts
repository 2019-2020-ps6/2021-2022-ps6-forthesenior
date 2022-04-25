import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {QuizService} from "../../services/quiz.service";
import {PlayService} from "../../services/play.service";
import {urlPopN} from "../utils/functions";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  public right = 0;
  public total = 0;

  constructor(private router: Router, private quizService: QuizService, private playService: PlayService) {
    this.right = this.playService.right;
    this.total = this.playService.total;
  }

  ngOnInit(): void {
    this.quizService.retrieveQuizzes();
  }

  restartSelected(): void {
    this.router.navigate([urlPopN(this.router.url, 2) + '/play/' + this.playService.quizId]);
  }

  backSelected(): void {
    this.router.navigate([urlPopN(this.router.url, 4)]);
  }
}
