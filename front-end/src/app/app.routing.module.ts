import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Connection} from './connection/connection';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {EditQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import {UserListComponent} from './users/user-list/user-list.component';
import {ThemeListComponent} from './themes/theme-list/theme-list.component';
import {QuizPlayComponent} from './quizzes/quiz-play/quiz-play.component';
import {ResultComponent} from './result/result.component';
import {OptionComponent} from "./option/option/option.component";

const routes: Routes = [
  {path: '', redirectTo: '/1/user-list', pathMatch: 'full'},
  {path: 'connection', component: Connection},
  {path: ':idAccount/user-list', component: UserListComponent},
  {path: ':idAccount/user-list/:idUser/theme-list', component: ThemeListComponent},
  {path: ':idAccount/user-list/:idUser/theme-list/:idTheme/quiz-list', component: QuizListComponent},
  {path: ':idAccount/user-list/:idUser/theme-list/:idTheme/quiz-list/:idQuiz', component: EditQuizComponent},
  {path: ':idAccount/user-list/:idUser/:idTheme/quiz-play/:idQuiz/question/:numero', component: QuizPlayComponent},
  {path: ':idAccount/user-list/:idUser/:idTheme/result/:idQuiz/:right/:total', component: ResultComponent},
  {path: ':idAccount/user-list/:idUser/option', component: OptionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
