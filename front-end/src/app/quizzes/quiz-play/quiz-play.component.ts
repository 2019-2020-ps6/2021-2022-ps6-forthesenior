import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrls: ['./quiz-play.component.scss']
})
export class QuizPlayComponent implements OnInit {

  public quiz: Quiz;
  public index: number;
  public next: boolean;
  right: number;
  answer: boolean;
  userId: string;


  constructor(private router: Router, private route: ActivatedRoute, private quizService: QuizService) {
    /*this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
    });*/
    this.next = false;
    this.right = 0;
    this.userId = this.route.snapshot.paramMap.get('idUser');
    //this.optionService.setOption(this.userId);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idQuiz');
    this.quizService.setSelectedQuiz(id);
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
    });
    this.index = Number(this.route.snapshot.paramMap.get('numero'));
  }

  nextQuestion(): void {
    this.index++;
    if (this.answer) {
      this.right++;
    }
    console.log(this.userId);
    let idAccount = this.route.snapshot.paramMap.get("idAccount");
    if (this.index === this.quiz.questions.length) {
      let url = idAccount + "/user-list/" + this.userId + "/result/" + this.quiz.id + "/"+this.right+"/"+this.quiz.questions.length;
      this.router.navigate([url]);
    } else {
      let url = idAccount + "/user-list/" + this.userId + "/quiz-play/" + this.quiz.id + "/question/"+this.index;
      this.router.navigate([url]);
    }
    this.next = false;
  }

  onAnswered(answer: boolean): void {
    this.next = true;
    this.answer = answer;
  }
}
