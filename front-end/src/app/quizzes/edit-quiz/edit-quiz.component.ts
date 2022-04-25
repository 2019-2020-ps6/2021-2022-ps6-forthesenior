import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Quiz} from 'src/models/quiz.model';
import {QuizService} from 'src/services/quiz.service';
import {OptionService} from "../../../services/option.service";

@Component({
  selector: 'app-quiz-theme',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  public quiz: Quiz;
  public userId: string;
  public quizId: string;

  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService, public optionService: OptionService) {
    this.quizId = this.route.snapshot.paramMap.get('idQuiz');
    this.quizService.setSelectedQuiz(this.quizId);
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.userId = this.route.snapshot.paramMap.get('idUser');
    this.optionService.setOption(this.userId);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idQuiz');
    this.quizService.setSelectedQuiz(id);
  }

  validate(): void {
    let url = this.router.url;
    this.router.navigate([url.substring(0, url.lastIndexOf('/') + 1)]);
  }
}
