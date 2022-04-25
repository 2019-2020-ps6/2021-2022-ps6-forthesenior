import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from 'src/models/quiz.model';
import {Question} from 'src/models/question.model';
import {QuestionService} from "../../../services/question.service";
import {AnswerService} from "../../../services/answer.service";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Input()
  public quiz: Quiz;

  public questionForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService, private questionService: QuestionService, private answerService: AnswerService) {
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
      this.questionService.addQuestion(question);
      this.answerService.retrieveAnswers();
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
      answerLabel: '',
      isCorrect: false,
    });
  }
}
