import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

  constructor(private router: Router, private themeService: ThemeService, private userService: UserService,
              private optionService: OptionService, public route: ActivatedRoute) {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
      this.optionService.caseNumber = this.themeList.length;
      this.optionService.options$.subscribe(() => this.optionService.update());
    });
    this.optionService.caseNumber$.subscribe((caseNumber: number) => {
      this.themeList = this.themeList.slice(0, caseNumber);
    });
    let user = this.route.snapshot.paramMap.get('userId');
    if(user === '0')
      this.userService.setAdmin(true);
  }

  ngOnInit(): void {
    this.themeService.retrieveThemes();
    if(this.isAdmin()) addAdminClasses();
    this.optionService.numberColumns(this.themeList.length);
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
