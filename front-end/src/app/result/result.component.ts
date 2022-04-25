import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Theme} from '../../models/theme.model';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../services/quiz.service";
import {Quiz} from "../../models/quiz.model";
import {OptionService} from "../../services/option.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  right: string;
  total: string;
  userId: string;
  quiz: Quiz;

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService, private optionService: OptionService) {
    const idQuiz = this.route.snapshot.paramMap.get('idQuiz');
    this.right = this.route.snapshot.paramMap.get('right');
    this.total = this.route.snapshot.paramMap.get('total');
    this.userId = this.route.snapshot.paramMap.get('idUser');
    this.quizService.setSelectedQuiz(idQuiz);
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
    });
    this.optionService.setOption(this.userId);
  }

  ngOnInit(): void {
  }

  restartSelected(): void {
    let idAccount = this.route.snapshot.paramMap.get("idAccount");
    let idTheme = this.route.snapshot.paramMap.get("idTheme");
    let url = idAccount + "/user-list/" + this.userId + "/theme-list/" + idTheme + "/quiz-list";
    this.router.navigate([url]);
  }

  backSelected(): void {
    let idAccount = this.route.snapshot.paramMap.get("idAccount");
    let url = idAccount + "/user-list/" + this.userId + "/theme-list";
    this.router.navigate([url]);
  }
}
