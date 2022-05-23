import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Theme} from '../../../models/theme.model';
import {addAdminClasses} from "../../utils/functions";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  @Input()
  theme: Theme;

  @Output()
  selectTheme: EventEmitter<Theme> = new EventEmitter<Theme>();
  @Output()
  deleteTheme: EventEmitter<Theme> = new EventEmitter<Theme>();

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    if (this.isAdmin()) addAdminClasses();
  }

  select(): void {
    this.selectTheme.emit(this.theme);
  }

  delete(): void {
    this.deleteTheme.emit(this.theme);
  }

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }
}
