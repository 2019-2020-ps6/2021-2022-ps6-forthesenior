import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
@Component({
  selector: 'app-quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrls: ['./quiz-play.component.scss']
})
export class QuizPlayComponent implements OnInit {

  public quiz: Quiz;
  public index: number;
  public next: boolean;


  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.next = false;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    this.index = Number(this.route.snapshot.paramMap.get('numero'));
  }

  nextQuestion(): void{
    this.index++;
    this.router.navigate(['/quiz-play/' + this.quiz.id + '/question/' + this.index.toString()]);
    this.next = false;
  }

  onAnswered(): void{
    this.next = true;
  }
}
