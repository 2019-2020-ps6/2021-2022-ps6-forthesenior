import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Theme} from '../../../models/theme.model';
import {ThemeService} from '../../../services/theme.service';
import {addAdminClasses} from "../../utils/functions";
import {OptionService} from "../../../services/option.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  @Input() public theme: Theme;
  public themeList: Theme[] = [];

  constructor(private router: Router, private themeService: ThemeService, private userService: UserService, private optionService: OptionService) {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });
    this.optionService.options$.subscribe(() => this.optionService.update())
  }

  ngOnInit(): void {
    this.themeService.retrieveThemes();
    if (this.isAdmin()) addAdminClasses();
  }

  selectTheme(theme: Theme): void {
    this.themeService.setSelectedTheme(theme.id);
    this.router.navigate([this.router.url + '/' + theme.id + '/quiz']);
  }

  deleteTheme(theme: Theme): void {
    this.themeService.deleteTheme(theme);
  }

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }
}
