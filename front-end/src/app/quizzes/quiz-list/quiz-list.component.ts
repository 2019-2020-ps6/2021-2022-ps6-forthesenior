import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {OptionService} from "../../../services/option.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
  public quizList: Quiz[] = [];

  constructor(private router: Router, public quizService: QuizService, private userService: UserService, private optionService: OptionService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
    this.optionService.options$.subscribe(() => this.optionService.update())
  }

  ngOnInit(): void {
    this.quizService.retrieveQuizzes();
  }

  playQuiz(quiz: Quiz): void {
    this.quizService.setSelectedQuiz(quiz.id);
    this.router.navigate([this.router.url + '/play/' + quiz.id]);
  }

  editQuiz(quiz: Quiz): void {
    this.quizService.setSelectedQuiz(quiz.id);
    this.router.navigate([this.router.url + '/edit/' + quiz.id]);
  }

  deleteQuiz(quiz: Quiz): void {
    this.quizService.deleteQuiz(quiz);
  }

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }
}
