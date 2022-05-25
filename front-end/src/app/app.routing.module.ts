import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Connection} from './utils/connection/connection';
import {ErrorPath} from './utils/error/error.path';
import {UserListComponent} from './users/user-list/user-list.component';
import {ThemeListComponent} from './themes/theme-list/theme-list.component';
import {QuizListComponent} from "./themes/quizzes/quiz-list/quiz-list.component";
import {QuizPlayComponent} from "./themes/quizzes/quiz-play/quiz-play.component";
import {ResultComponent} from './themes/quizzes/result/result.component';
import {EditQuizComponent} from "./themes/quizzes/edit-quiz/edit-quiz.component";
import {EditThemeComponent} from "./themes/edit-theme/edit-theme.component";
import {OptionComponent} from "./users/options/option.component";
import {StatListComponent} from "./users/stats/stat-list/stat-list.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'connection',
    pathMatch: 'full'
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
    path: 'account/:accountId/user/stat',
    component: StatListComponent
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
  {
    path: 'account/:accountId/user/:userId/option',
    component: OptionComponent
  },
  {
    path: '**',
    component: ErrorPath
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
