import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {Theme} from "../../../models/theme.model";
import {OptionService} from "../../../services/option.service";
import {ThemeService} from "../../../services/theme.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  public quizList: Quiz[] = [];
  public theme: Theme;

  constructor(private router: Router, public quizService: QuizService, private optionService: OptionService,
              private themeService: ThemeService, private userService: UserService, private route : ActivatedRoute) {
    themeService.setSelectedTheme(this.route.snapshot.paramMap.get('themeId'));
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
      this.optionService.caseNumber = this.quizList.length;
      this.optionService.options$.subscribe(() => this.optionService.update())
    });
    this.themeService.themeSelected$.subscribe((theme: Theme) => {
      this.theme = theme;
    });
    this.optionService.caseNumber$.subscribe((caseNumber: number) => {
      this.quizList = this.quizList.slice(0, caseNumber);
    });
    let user = this.route.snapshot.paramMap.get('userId');
    if(user === '0')
      this.userService.setAdmin(true);
  }

  ngOnInit(): void {
    this.quizService.retrieveQuizzes();
  }

  playQuiz(quiz: Quiz): void {
    this.quizService.setSelectedQuiz(quiz.id);
    this.router.navigate([this.router.url + '/play/' + quiz.id]);
  }

  editQuiz(quiz: Quiz): void {
    this.quizService.setSelectedQuiz(quiz.id);
    this.router.navigate([this.router.url + '/edit/' + quiz.id]);
  }

  deleteQuiz(quiz: Quiz): void {
    this.quizService.deleteQuiz(quiz);
  }

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }
}
