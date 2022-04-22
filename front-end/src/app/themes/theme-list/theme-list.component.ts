import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Theme} from '../../../models/theme.model';
import {ThemeService} from '../../../services/theme.service';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from "../../../models/quiz.model";
import {Option} from "../../../models/option.model";
import {OptionService} from "../../../services/option.service";

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  @Input()
  public theme: Theme;

  public themeList: Theme[] = [];
  public userId:string;

  constructor(private router: Router, public themeService: ThemeService, public quizService: QuizService,
              private route: ActivatedRoute, public optionService : OptionService) {
    this.userId = this.route.snapshot.paramMap.get('idUser');
    this.themeService.setIds(
      this.route.snapshot.paramMap.get('idAccount'),
      this.userId
    )
    this.themeService.retrieveThemes();
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });

    this.optionService.setOption(this.userId);
  }

  ngOnInit(): void {
  }

  deleteTheme(theme: Theme): void {
    this.themeService.deleteTheme(theme);
  }

  setSelectedTheme(themeId: string): void {
    this.themeService.setSelectedTheme(themeId);
    //this.router.navigate(['/quiz-list/' + themeId]);
  }

  getUserId(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    //this.themeService.getOption(userId);
    /*const optionUrl = "/option/" + userId;
    this.http.get<Option>(optionUrl).subscribe((option) => {
      this.option = option;
    }*/
  }
}
