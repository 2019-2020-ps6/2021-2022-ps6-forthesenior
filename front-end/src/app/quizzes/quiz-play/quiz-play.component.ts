import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrls: ['./quiz-play.component.scss']
})
export class QuizPlayComponent implements OnInit {

  @Input() public quiz: Quiz;
  public index: number;
  public next: boolean;
  right: number;
  answer: boolean;


  constructor(private router: Router, private quizService: QuizService) {
    this.quizService.quizSelected$.asObservable().subscribe((quiz) => {
      this.quiz = quiz;
    })
    this.next = false;
    this.right = 0;
  }

  ngOnInit(): void {
    this.quizService.retrieveQuizzes();
  }

  nextQuestion(): void {
    this.index++;
    if (this.answer) {
      this.right++;
    }
    if (this.index === this.quiz.questions.length) {
      this.router.navigate([this.quizService.getQuizUrl() + '/result/' + this.quiz.id + '/' + this.right + '/' + this.index]);
    } else {
      this.router.navigate([this.quizService.getQuizUrl() + '/play/' + this.quiz.id + '/question/' + this.index.toString()]);
    }
    this.next = false;
  }

  onAnswered(answer: boolean): void {
    this.next = true;
    this.answer = answer;
  }

  goToQuizzes() {
    let url = this.router.url;
    if (url.includes('quizzes')) {
      const urlRoutes = url.split('/');
      while (urlRoutes.length > 0 && urlRoutes.pop() !== 'quizzes') {
      }
      urlRoutes.push('quizzes');
      url = urlRoutes.join('/');
    }
    this.router.navigate([url]);
  }
}
