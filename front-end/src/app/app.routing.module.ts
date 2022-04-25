import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Connection} from './connection/connection';
import {ErrorPath} from './error/error.path';
import {UserListComponent} from './users/user-list/user-list.component';
import {ThemeListComponent} from './themes/theme-list/theme-list.component';
import {QuizListComponent} from "./quizzes/quiz-list/quiz-list.component";
import {QuizPlayComponent} from "./quizzes/quiz-play/quiz-play.component";
import {ResultComponent} from "./result/result.component";
import {EditQuizComponent} from "./quizzes/edit-quiz/edit-quiz.component";
import {EditThemeComponent} from "./themes/edit-theme/edit-theme.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: ErrorPath
  },
  {
    path: 'connection',
    component: Connection
  },
  {
    path: 'account/:accountId/user',
    component: UserListComponent
  },
  {
    path: 'account/:accountId/user/:userId/theme',
    component: ThemeListComponent
  },
  {
    path: 'account/:accountId/user/:userId/theme/edit/:themeId',
    component: EditThemeComponent
  },
  {
    path: 'account/:accountId/user/:userId/theme/:themeId/quiz',
    component: QuizListComponent
  },
  {
    path: 'account/:accountId/user/:userId/theme/:themeId/quiz/edit/:quizId',
    component: EditQuizComponent
  },
  {
    path: 'account/:accountId/user/:userId/theme/:themeId/quiz/play/:quizId',
    component: QuizPlayComponent
  },
  {
    path: 'account/:accountId/user/:userId/theme/:themeId/quiz/result/:quizId',
    component: ResultComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {

}
