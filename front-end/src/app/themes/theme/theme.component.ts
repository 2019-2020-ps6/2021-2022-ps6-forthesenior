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
  selectTheme: EventEmitter<Theme> = new EventEmitter<Theme>();
  @Output()
  deleteTheme: EventEmitter<Theme> = new EventEmitter<Theme>();

  constructor() {
  }

  ngOnInit(): void {
  }

  select(): void {
    this.selectTheme.emit(this.theme);
  }

  delete(): void {
    this.deleteTheme.emit(this.theme);
  }
}
