import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Theme} from '../../../models/theme.model';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.scss']
})
export class EditThemeComponent implements OnInit {

  public theme: Theme;

  constructor(private route: ActivatedRoute, private themeService: ThemeService) {
    this.themeService.themeSelected$.subscribe((theme) => this.theme = theme);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.themeService.setSelectedTheme(id);
  }
}
