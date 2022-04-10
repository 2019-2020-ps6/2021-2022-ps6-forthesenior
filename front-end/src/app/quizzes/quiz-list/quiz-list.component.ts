import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {Theme} from '../../../models/theme.model';
import {ThemeService} from "../../../services/theme.service";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];

  constructor(private router: Router, public quizService: QuizService, public route: ActivatedRoute) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit(): void {
  }

  quizSelected(quiz: Quiz): void {
    this.quizService.setSelectedQuiz(quiz.id);
    this.router.navigate(['/quiz-play/0']);
  }

  editQuiz(quiz: Quiz): void {
    this.quizService.setSelectedQuiz(quiz.id);
  }

  deleteQuiz(quiz: Quiz): void {
    this.quizService.deleteQuiz(quiz);
  }
}
