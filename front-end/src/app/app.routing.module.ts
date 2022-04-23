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
    path: 'accounts/:accountId/users',
    component: UserListComponent
  },
  {
    path: 'accounts/:accountId/users/:userId/themes',
    component: ThemeListComponent
  },
  {
    path: 'accounts/:accountId/users/:userId/themes/edit/:themeId',
    component: EditThemeComponent
  },
  {
    path: 'accounts/:accountId/users/:userId/themes/:themeId/quizzes',
    component: QuizListComponent
  },
  {
    path: 'accounts/:accountId/users/:userId/themes/:themeId/quizzes/edit/:quizId',
    component: EditQuizComponent
  },
  {
    path: 'accounts/:accountId/users/:userId/themes/:themeId/quizzes/play/:id/question/:numero',
    component: QuizPlayComponent
  },
  {
    path: 'accounts/:accountId/users/:userId/themes/:themeId/quizzes/result/:id/:right/:total',
    component: ResultComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {

}
