import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from 'src/models/quiz.model';
import {Question} from 'src/models/question.model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Input()
  public quiz: Quiz;

  public questionForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService) {
    this.initializeQuestionForm();
  }

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  ngOnInit(): void {
  }

  addAnswer(): void {
    this.answers.push(this.createAnswer());
  }

  addQuestion(): void {
    if (this.questionForm.valid) {
      const question = this.questionForm.getRawValue() as Question;
      this.quizService.addQuestion(this.quiz, question);
      this.initializeQuestionForm();
    }
  }

  private initializeQuestionForm(): void {
    this.questionForm = this.formBuilder.group({
      questionLabel: ['', Validators.required],
      answers: this.formBuilder.array([])
    });
  }

  private createAnswer(): FormGroup {
    return this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
  }
}
