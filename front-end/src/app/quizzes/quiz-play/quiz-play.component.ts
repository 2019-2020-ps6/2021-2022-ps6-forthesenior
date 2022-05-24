import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {OptionService} from "../../../services/option.service";
import {UserService} from "../../../services/user.service";
import {BehaviorSubject} from "rxjs";
import {urlPopN} from "../../utils/functions";
import {PlayService} from "../../../services/play.service";

@Component({
  selector: 'app-quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrls: ['./quiz-play.component.scss']
})
export class QuizPlayComponent implements OnInit {

  @Output() showReponse: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  public quiz: Quiz;
  public index: number;
  public next: boolean;
  right: number;
  answer: boolean;
  userId: string;
  timeLeft: number;
  timeLeftOld : number;
  timer: boolean;
  secondChance: boolean;
  interval;
  public answerList$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService,
              private userService: UserService, private optionService: OptionService,
              private playService : PlayService) {
    this.quizService.quizSelected$.subscribe((quiz: Quiz) => {
      this.quiz = quiz;
    });
    this.optionService.options$.subscribe(() => this.optionService.update())
  }

  ngOnInit(): void {
    this.next = false;
    this.timer = false;
    this.secondChance = false;
    this.right = 0;
    this.userId = this.route.snapshot.paramMap.get('idUser');
    const id = this.route.snapshot.paramMap.get('idQuiz');
    this.quizService.setSelectedQuiz(id);
    this.quizService.quizSelected$.subscribe((quiz) => {
      if (quiz !== null) {
        this.quiz = quiz;
      }
    });
    this.index = 0;
    this.timeLeft = this.optionService.timeLeft;
    this.timeLeftOld = this.timeLeft;
  }

  nextQuestion(): void {
    console.log("nextQuestion");
    clearInterval(this.interval);
    this.timeLeft = this.timeLeftOld;
    this.index++;
    this.timer = false;
    if (this.answer) {
      this.right++;
    }
    if (this.index === this.quiz.questions.length) {
      this.playService.right = this.right;
      this.playService.total = this.index;
      this.router.navigate([urlPopN(this.router.url, 2) + '/result/' + this.quiz.id]);
    } else {
      this.router.navigate([this.router.url]);
    }
    this.next = false;
  }

  startTimer(): void {
    if (this.timeLeft > 3) {
      this.timeLeft--;
    } else if (this.timeLeft > 0) {
      this.answerList$.next(true);
      this.timeLeft--;
    } else {
      this.nextQuestion();
      this.answerList$.next(false);
    }
    console.log("time " + this.timeLeft);
  }

  onAnswered(answer: boolean): void {
    if (!this.timer) {
      this.timeLeft--;
      this.startTimer();
      this.interval = setInterval(() => {
        this.startTimer()
      }, 1000);
      this.timer = true;
    }
    this.answer = answer;
  }
}
