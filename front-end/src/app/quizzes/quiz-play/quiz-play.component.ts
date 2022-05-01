import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {PlayService} from '../../../services/play.service'
import {urlPopN} from "../../utils/functions";

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
    if (this.quiz === undefined) {
      this.quizService.setSelectedQuiz(document.URL.split('/').pop())
    }
  }

  nextQuestion(): void {
    this.index++;
    if (this.answer) {
      this.right++;
    }
    if (this.index === this.quiz.questions.length) {
      this.playService.right = this.right;
      this.playService.total = this.index;
      this.router.navigate([urlPopN(this.router.url, 2) + '/result/' + this.quiz.id]);
    }
    this.next = false;
  }

  onAnswered(answer: boolean): void {
    this.next = true;
    this.answer = answer;
  }
}
