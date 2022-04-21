import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {EditQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import {UserListComponent} from './users/user-list/user-list.component';
import {ThemeListComponent} from './themes/theme-list/theme-list.component';
import {QuizPlayComponent} from './quizzes/quiz-play/quiz-play.component';
import {ResultComponent} from './result/result.component';

const routes: Routes = [
  {path: 'user-list', component: UserListComponent},
  {path: 'quiz-list/:themeId', component: QuizListComponent},
  {path: 'user-list/:userId/theme-list', component: ThemeListComponent},
  {path: 'edit-list', component: EditQuizComponent},
  {path: ':userId/theme-list/:theme/quiz-list', component: QuizListComponent},
  {path: '', redirectTo: '/user-list', pathMatch: 'full'},
  {path: ':userId/edit-quiz/:id', component: EditQuizComponent},
  {path: ':userId/result/:id/:right/:total', component: ResultComponent},
  {path: ':userId/quiz-play/:id/question/:numero', component: QuizPlayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
