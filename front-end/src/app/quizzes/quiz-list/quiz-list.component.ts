import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {ThemeService} from "../../../services/theme.service";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public quiz: Quiz;

  constructor(private router: Router, public quizService: QuizService, public route: ActivatedRoute, public themeService: ThemeService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit(): void {
    this.quizService.retrieveQuizzes();
  }

  selectQuiz(quiz: Quiz): void {
    this.router.navigate([this.router.url + '/quiz-play/' + quiz.id + '/question/0']);
  }

  editQuiz(quiz: Quiz): void {
    this.router.navigate([this.router.url + '/edit-theme/' + quiz.quizLabel]);
  }

  deleteQuiz(quiz: Quiz): void {
    this.quizService.deleteQuiz(quiz);
  }
}
