import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {PlayService} from '../../../services/play.service'

@Component({
  selector: 'app-quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrls: ['./quiz-play.component.scss']
})
export class QuizPlayComponent implements OnInit {

  @Input() public quiz: Quiz;
  public index = 0;
  public next = false;
  private right = 0;
  private answer: boolean;


  constructor(private router: Router, private quizService: QuizService, private playService: PlayService) {
    this.quizService.quizSelected$.asObservable().subscribe((quiz) => {
      this.quiz = quiz;
    })
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
      const urlPath = this.router.url.split('/');
      urlPath.pop();
      urlPath.pop();
      this.playService.right = this.right;
      this.playService.total = this.index;
      this.router.navigate([urlPath.join('/') + '/result/' + this.quiz.id]);
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
