import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {ThemeService} from "../../../services/theme.service";
import {Theme} from "../../../models/theme.model";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public theme: Theme;

  constructor(private router: Router, public quizService: QuizService, public route: ActivatedRoute, public themeService: ThemeService) {
    this.themeService.themeSelected$.subscribe((theme) =>{
      this.theme=theme;
    })
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
    this.quizService.retrieveQuizzes();
  }

  ngOnInit(): void {
  }

  quizSelected(quiz: Quiz): void {
    this.router.navigate(['/quiz-play/' + quiz.id + '/question/0']);
  }

  editQuiz(quiz: Quiz): void {
    this.router.navigate(['/edit-theme/' + quiz.name]);
  }

  deleteQuiz(quiz: Quiz): void {
    this.quizService.deleteQuiz(quiz);
  }
}
