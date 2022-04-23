import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {ThemeService} from "../../../services/theme.service";
import {Theme} from "../../../models/theme.model";
import {OptionService} from "../../../services/option.service";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public theme: Theme;
  public userId: string;
  private readonly themeId: string;

  constructor(private router: Router, public quizService: QuizService, public route: ActivatedRoute,
              public themeService: ThemeService, private optionService: OptionService) {
    this.userId = this.route.snapshot.paramMap.get('idUser');
    this.themeId = this.route.snapshot.paramMap.get('idTheme');

    this.quizService.setIdTheme(this.themeId);
    this.quizService.retrieveQuizzes();
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
    this.optionService.setOption(this.userId);
  }

  ngOnInit(): void {
    this.themeService.setSelectedTheme(this.themeId);
    this.themeService.themeSelected$.subscribe((theme) => {
      this.theme = theme;
    });
  }

  quizSelected(quiz: Quiz): void {
    let idAccount = this.route.snapshot.paramMap.get("idAccount");
    let url = idAccount + "/user-list/" + this.userId + "/" + this.themeId + "/quiz-play/" + quiz.id + "/question/0";
    this.router.navigate([url]);
  }

  editQuiz(quiz: Quiz): void {
    this.router.navigate(['/edit-theme/' + quiz.name]);
  }

  deleteQuiz(quiz: Quiz): void {
    this.quizService.deleteQuiz(quiz);
  }
}
