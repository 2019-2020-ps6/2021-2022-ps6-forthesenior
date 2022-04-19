import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Theme} from '../../../models/theme.model';
import {ThemeService} from '../../../services/theme.service';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from "../../../models/quiz.model";

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  @Input()
  public theme: Theme;

  public themeList: Theme[] = [];

  constructor(private router: Router, public themeService: ThemeService, public quizService: QuizService) {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });
  }

  ngOnInit(): void {
  }

  deleteTheme(theme: Theme): void {
    this.themeService.deleteTheme(theme);
  }

  setSelectedTheme(themeId: string): void {
    this.themeService.setSelectedTheme(themeId);
    this.router.navigate(['/quiz-list/'+themeId]);
  }
}
