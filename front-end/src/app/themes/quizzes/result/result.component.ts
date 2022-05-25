import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {QuizService} from "../../../../services/quiz.service";
import {PlayService} from "../../../../services/play.service";
import {urlPopN, urlPopUntil} from "../../../utils/functions";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private quizService: QuizService, public playService: PlayService) {
  }

  ngOnInit(): void {
    this.userService.retrieveUsers();
    this.quizService.retrieveQuizzes();
    if (this.playService.user === undefined) this.userService.setSelectedUser(urlPopUntil(this.router.url.split('/').reverse().join('/'), 'user').split('/').pop())
    if (this.playService.quiz === undefined) this.quizService.setSelectedQuiz(this.router.url.split('/').pop())
    this.updateStat();
  }

  restartSelected(): void {
    this.router.navigate([urlPopN(this.router.url, 2) + '/play/' + this.playService.quiz.id]);
  }

  backSelected(): void {
    this.router.navigate([urlPopN(this.router.url, 4)]);
  }

  private updateStat(): void {
    if (this.playService.total > 0 && this.playService.user !== undefined) {
      this.userService.updateStats(this.playService.user, this.playService.right / this.playService.total, this.playService.outsideClick);
    }
  }
}
