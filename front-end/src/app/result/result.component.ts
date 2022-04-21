import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Theme} from '../../models/theme.model';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  right: string;
  total: string;
  userId: string;

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService) {
    this.right = this.route.snapshot.paramMap.get('right');
    this.total = this.route.snapshot.paramMap.get('total');
    this.userId = this.route.snapshot.paramMap.get('userId');
  }

  ngOnInit(): void {
  }

  restartSelected(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.quizService.setSelectedQuiz(id);
    this.router.navigate([this.userId + '/quiz-play/' + id + '/question/0']);
  }

  backSelected(): void {
    this.router.navigate(['user-list/' + this.userId +'/theme-list/']);
  }
}
