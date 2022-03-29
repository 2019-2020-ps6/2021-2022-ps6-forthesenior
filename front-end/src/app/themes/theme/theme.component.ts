import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Theme} from '../../../models/theme.model';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  @Input()
  theme: Theme;

  @Output()
  selectTheme: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  deleteTheme: EventEmitter<Theme> = new EventEmitter<Theme>();

  constructor() {
  }

  ngOnInit(): void {
  }

  themeSelected(): void {
    this.selectTheme.emit(this.theme.id);
  }

  delete(): void {
    this.deleteTheme.emit(this.theme);
  }
}
