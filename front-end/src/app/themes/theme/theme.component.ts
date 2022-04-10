import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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
  selectTheme: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  deleteTheme: EventEmitter<Theme> = new EventEmitter<Theme>();

  constructor() {
  }

  ngOnInit(): void {
  }

  themeSelected(): void {
    this.selectTheme.emit(true);
  }

  delete(): void {
    this.deleteTheme.emit(this.theme);
  }
}
