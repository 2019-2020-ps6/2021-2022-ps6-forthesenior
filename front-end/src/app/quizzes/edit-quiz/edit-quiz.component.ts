import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import {OptionService} from "../../../services/option.service";

@Component({
  selector: 'app-quiz-theme',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  public quiz: Quiz;
  public userId : string;

  constructor(private route: ActivatedRoute, private quizService: QuizService, public optionService : OptionService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.userId= this.route.snapshot.paramMap.get('userId');
    //this.optionService.setOption(this.userId);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

}
