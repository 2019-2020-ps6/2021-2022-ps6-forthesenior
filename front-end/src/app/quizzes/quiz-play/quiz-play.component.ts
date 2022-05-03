import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {OptionService} from "../../../services/option.service";
import {UserService} from "../../../services/user.service";

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
  userId: string;


  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService, private userService: UserService, private optionService: OptionService) {

  }

  ngOnInit(): void {
    this.next = false;
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
  }

  nextQuestion(): void {
    this.index++;
    if (this.answer) {
      this.right++;
    }
    let idAccount = this.route.snapshot.paramMap.get("idAccount");
    let idTheme = this.route.snapshot.paramMap.get("idTheme");
    if (this.index === this.quiz.questions.length) {
      this.userService.addStat(this.userId, this.right / this.index);
      let url = idAccount + "/user-list/" + this.userId + "/" + idTheme + "/result/" + this.quiz.id + "/" + this.right + "/" + this.index;
      this.router.navigate([url]);
    } else {
      let url = idAccount + "/user-list/" + this.userId + "/" + idTheme + "/quiz-play/" + this.quiz.id + "/question/" + this.index;
      this.router.navigate([url]);
    }
    this.next = false;
  }

  onAnswered(answer: boolean): void {
    this.next = true;
    this.answer = answer;
  }
}
