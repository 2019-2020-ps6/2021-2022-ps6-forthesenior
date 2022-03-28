import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {EditQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import {UserListComponent} from './users/user-list/user-list.component';
import {ThemeListComponent} from './themes/theme-list/theme-list.component';
import {QuizPlayComponent} from './quizzes/quiz-play/quiz-play.component';

const routes: Routes = [
  {path: 'user-list', component: UserListComponent},
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'theme-list', component: ThemeListComponent},
  {path: 'edit-theme/:id', component: EditQuizComponent},
  {path: 'edit-list', component: EditQuizComponent},
  {path: ':id/quiz-list', component: EditQuizComponent},
  {path: 'theme-list/:theme/quiz-list', component: QuizListComponent},
  {path: '', redirectTo: '/theme-list', pathMatch: 'full'},
  {path: 'quiz-play/:id/question/:numero', component: QuizPlayComponent},
  {path: 'edit-quiz/:id', component: EditQuizComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
