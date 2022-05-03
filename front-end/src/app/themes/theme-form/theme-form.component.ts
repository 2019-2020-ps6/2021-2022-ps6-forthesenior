import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Theme} from '../../../models/theme.model';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss']
})
export class ThemeFormComponent implements OnInit {

  public themeForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public themeService: ThemeService) {
    this.themeForm = this.formBuilder.group({
      themeLabel: [''],
    });
  }

  ngOnInit(): void {
  }

  addTheme(): void {
    const themeToCreate: Theme = this.themeForm.getRawValue() as Theme;
    this.themeService.addTheme(themeToCreate);
  }

}
