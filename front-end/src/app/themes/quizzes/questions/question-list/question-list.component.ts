import {Component, OnInit} from '@angular/core';
import {Question} from 'src/models/question.model';
import {QuestionService} from 'src/services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  public questionList: Question[] = [];

  constructor(private questionService: QuestionService) {
    this.questionService.questions$.subscribe((questions: Question[]) => {
      this.questionList = questions;
    });
  }

  ngOnInit(): void {
    this.questionService.retrieveQuestions();
  }

  deleteQuestion(question: Question): void {
    this.questionService.deleteQuestion(question);
  }
}
