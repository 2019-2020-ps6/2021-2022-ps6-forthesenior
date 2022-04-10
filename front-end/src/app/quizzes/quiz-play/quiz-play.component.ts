import {Component, OnInit} from '@angular/core';
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
  right: number;
  answer: boolean;


  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.next = false;
    this.right = 0;
  }

  ngOnInit(): void {
    this.index = Number(this.route.snapshot.paramMap.get('numero'));
  }

  nextQuestion(): void {
    this.index++;
    if (this.answer) {
      this.right++;
    }
    if (this.index === this.quiz.questions.length) {
      this.router.navigate(['/result/' + this.right + '/' + this.index]);
    } else {
      this.router.navigate(['/quiz-play/question/' + this.index.toString()]);
    }
    this.next = false;
  }

  onAnswered(answer: boolean): void {
    this.next = true;
    this.answer = answer;
  }
}
