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
  public userId: string;

  constructor(private router: Router, public themeService: ThemeService, public quizService: QuizService,
              private route: ActivatedRoute, public optionService: OptionService) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('idUser');
    this.themeService.retrieveThemes();
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      if (themes != null) {
        this.themeList = themes;
        this.optionService.setColumns(this.themeList.length);
      }
    });
    this.optionService.setOption(this.userId);
    if (this.userId === '0') {
      let grid = document.getElementsByTagName('div');
      for (let i = 0; i < grid.length; i++) grid[i].classList.add("admin");
    }
  }

  deleteTheme(theme: Theme): void {
    this.themeService.deleteTheme(theme);
  }

  setSelectedTheme(themeId: string): void {
    this.router.navigate([themeId, 'quiz-list'], {relativeTo: this.route});
  }
}
