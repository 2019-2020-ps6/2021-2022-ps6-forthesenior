import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Theme} from '../../../models/theme.model';
import {ActivatedRoute} from "@angular/router";

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

  public userId:string;

  constructor(public route : ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get('idUser');
  }

  ngOnInit(): void {
    if (this.userId === '0') {
      let grid = document.getElementsByTagName('div');
      for (let i = 0; i < grid.length; i++) grid[i].classList.add("admin");
    }
  }

  themeSelected(): void {
    this.selectTheme.emit(this.theme.id);
  }

  delete(): void {
    this.deleteTheme.emit(this.theme);
  }
}
