import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Connection} from './connection/connection';
import {UserListComponent} from './users/user-list/user-list.component';
import {ThemeListComponent} from './themes/theme-list/theme-list.component';
import {QuizListComponent} from "./quizzes/quiz-list/quiz-list.component";
import {QuizPlayComponent} from "./quizzes/quiz-play/quiz-play.component";
import {ResultComponent} from "./result/result.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/connection',
    pathMatch: 'full'
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
    path: 'accounts/:accountId/users/:userId/themes/:themeId/quizzes',
    component: QuizListComponent
  },
  {
    path: 'accounts/:accountId/users/:userId/themes/:themeId/quizzes/quiz-play/:id/question/:numero',
    component: QuizPlayComponent
  },
  {
    path: 'accounts/:accountId/users/:userId/themes/:themeId/quizzes/result/:id/:right/:total',
    component: ResultComponent
  },


  // {path: 'edit-theme/:id', component: EditQuizComponent},
  // {path: 'edit-list', component: EditQuizComponent},
  // {path: ':id/quiz-list', component: EditQuizComponent},
  // {path: 'edit-quiz/:id', component: EditQuizComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {

}
