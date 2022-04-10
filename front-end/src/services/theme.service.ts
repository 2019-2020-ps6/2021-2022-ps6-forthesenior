import { Injectable } from '@angular/core';
import {BehaviorSubject, ReplaySubject, Subject} from 'rxjs';
import {THEME_LIST} from '../mocks/quiz-list.mock';
import {Theme} from '../models/theme.model';
import {HttpClient} from '@angular/common/http';
import {httpOptionsBase, serverUrl} from '../configs/server.config';
import {QuizService} from "./quiz.service";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themes: Theme[] = THEME_LIST;
  private themeUrl = serverUrl + '/theme-list';
  private httpOptions = httpOptionsBase;

  /*
   Observable which contains the list of the theme.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public themes$: BehaviorSubject<Theme[]>
    = new BehaviorSubject(this.themes);

  public themeSelected$: BehaviorSubject<Theme>;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.themeSelected$ = new BehaviorSubject<Theme>(0);

    this.retrieveThemes();
  }
  retrieveThemes(): void {
    this.http.get<Theme[]>(this.themeUrl).subscribe((themeList) => {
      this.themes = themeList;
      this.themes$.next(this.themes);
    });
  }

  addTheme(theme: Theme): void {
    this.http.post<Theme>(this.themeUrl, theme, this.httpOptions).subscribe(() => this.retrieveThemes());
  }

  setSelectedTheme(themeId: string): void {
    const urlWithId = this.themeUrl + '/' + themeId;

    this.http.get<Theme>(urlWithId).subscribe((theme) => {
      this.themeSelected$.next(theme);
    });
  }
}
