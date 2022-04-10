import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Theme} from '../../../models/theme.model';
import {Quiz} from "../../../models/quiz.model";

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  @Input()
  theme: Theme;

  @Output()
  selectedTheme: EventEmitter<Theme> = new EventEmitter<Theme>();
  constructor() {
  }

  ngOnInit(): void {
  }

  themeSelected(): void {
    this.selectedTheme.emit(this.theme);
  }
}
