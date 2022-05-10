import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {OptionService} from "../../../services/option.service";
import {UserService} from "../../../services/user.service";
import {BehaviorSubject} from "rxjs";

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
  timer: boolean;
  secondChance: boolean;
  interval;
  public answerList$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  @Input() public quiz: Quiz;
  public index = 0;
  public next = false;
  private right = 0;
  private answer: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService, private userService: UserService, private optionService: OptionService) {
    this.timeLeft = 7;
  }

  ngOnInit(): void {
    this.next = false;
    this.timer = false;
    this.secondChance = false;
    this.right = 0;
    this.userId = this.route.snapshot.paramMap.get('idUser');
    const id = this.route.snapshot.paramMap.get('idQuiz');
    const themeId = this.route.snapshot.paramMap.get('idTheme');
    this.quizService.setIdTheme(themeId);
    this.quizService.setSelectedQuiz(id);
    this.optionService.setOption(this.userId);
    this.quizService.quizSelected$.subscribe((quiz) => {
      if (quiz !== null) {
        this.quiz = quiz;
        this.optionService.setColumns(this.quiz.questions.length);
      }
    });
    this.index = Number(this.route.snapshot.paramMap.get('numero'));
    this.timeLeft = this.optionService.timeLeft;
  }

  nextQuestion(): void {
    clearInterval(this.interval);
    this.timeLeft = this.optionService.timeLeft;
    this.index++;
    this.timer = false;
    if (this.answer) {
      this.right++;
    }
    let idAccount = this.route.snapshot.paramMap.get("idAccount");
    let idTheme = this.route.snapshot.paramMap.get("idTheme");
    if (this.index === this.quiz.questions.length) {
      this.userService.addStat(this.userId, this.right / this.index);
      let url = idAccount + "/user-list/" + this.userId + "/" + idTheme + "/result/" + this.quiz.id + "/" + this.right + "/" + this.index;
      this.router.navigate([url]);
      /*this.playService.right = this.right;
      this.playService.total = this.index;
      this.router.navigate([urlPopN(this.router.url, 2) + '/result/' + this.quiz.id]);*/
    } else {
      let url = idAccount + "/user-list/" + this.userId + "/" + idTheme + "/quiz-play/" + this.quiz.id + "/question/" + this.index;
      this.router.navigate([url]);
    }
    this.next = false;
  }

  startTimer(): void {
    if (this.timeLeft > 3) {
      this.timeLeft--;
    } else if (this.timeLeft > 1) {
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
      this.startTimer();
      this.interval = setInterval(() => {
        this.startTimer()
      }, 1000);
      this.timer = true;
    }
    this.answer = answer;
  }
}
