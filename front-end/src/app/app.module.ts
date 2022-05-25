import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {QuizListComponent} from './themes/quizzes/quiz-list/quiz-list.component';
import {QuizComponent} from './themes/quizzes/quiz/quiz.component';
import {HeaderComponent} from './utils/header/header.component';
import {QuizFormComponent} from './themes/quizzes/quiz-form/quiz-form.component';
import {EditQuizComponent} from './themes/quizzes/edit-quiz/edit-quiz.component';
import {AppRoutingModule} from './app.routing.module';
import {QuestionListComponent} from './themes/quizzes/questions/question-list/question-list.component';
import {QuestionFormComponent} from './themes/quizzes/questions/question-form/question-form.component';
import {QuestionComponent} from './themes/quizzes/questions/question/question.component';
import {UserComponent} from './users/user/user.component';
import {UserFormComponent} from './users/user-form/user-form.component';
import {UserListComponent} from './users/user-list/user-list.component';
import {ThemeListComponent} from './themes/theme-list/theme-list.component';
import {ThemeComponent} from './themes/theme/theme.component';
import {ThemeFormComponent} from './themes/theme-form/theme-form.component';
import {EditThemeComponent} from './themes/edit-theme/edit-theme.component';
import {QuizPlayComponent} from './themes/quizzes/quiz-play/quiz-play.component';
import {QuizQuestionComponent} from './themes/quizzes/quiz-question/quiz-question.component';
import {AnswerQuizComponent} from './themes/quizzes/answer-quiz/answer-quiz.component';
import {ResultComponent} from './themes/quizzes/result/result.component';
import {Connection} from './utils/connection/connection';
import {ErrorPath} from './utils/error/error.path'
import {StatListComponent} from "./users/stats/stat-list/stat-list.component";
import {StatComponent} from "./users/stats/stat/stat.component";
import {OptionComponent} from "./users/options/option.component";

@NgModule({
  declarations: [
    AppComponent,
    Connection,
    ErrorPath,
    QuizListComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    EditQuizComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionComponent,
    UserComponent,
    UserFormComponent,
    UserListComponent,
    QuizPlayComponent,
    ThemeListComponent,
    ThemeComponent,
    ThemeFormComponent,
    EditThemeComponent,
    QuizQuestionComponent,
    AnswerQuizComponent,
    ResultComponent,
    StatComponent,
    StatListComponent,
    OptionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
