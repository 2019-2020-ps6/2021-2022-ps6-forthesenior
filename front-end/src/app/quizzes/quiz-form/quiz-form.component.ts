import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {ThemeService} from "../../../services/theme.service";
import {Theme} from "../../../models/theme.model";

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {

  public quizForm: FormGroup;
  public theme: Theme;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, public themeService: ThemeService) {
    this.themeService.themeSelected$.subscribe((theme) => {
      this.theme = theme;
    })
    this.quizForm = this.formBuilder.group({
      quizLabel: [''],
    });
  }

  ngOnInit(): void {
  }

  addQuiz(): void {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    this.quizService.addQuiz(quizToCreate);
  }

}
