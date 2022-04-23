import {Component, Input, OnInit} from '@angular/core';
import {Question} from 'src/models/question.model';
import {QuestionService} from 'src/services/question.service';
import {Quiz} from "../../../models/quiz.model";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input() public quiz: Quiz;
  public question: Question;
  public questionList: Question[] = [];

  constructor(private questionService: QuestionService) {
    this.questionService.questions$.subscribe((questions: Question[]) => {
      this.questionList = questions;
    });
  }

  ngOnInit(): void {
  }

  deleteQuestion(question: Question): void {
    this.questionService.deleteQuestion(question);
  }
}
