import { Injectable } from '@angular/core';
import {BehaviorSubject, ReplaySubject, Subject} from 'rxjs';
import {THEME_LIST} from '../mocks/quiz-list.mock';
import {Theme} from '../models/theme.model';
import {HttpClient} from '@angular/common/http';
import {httpOptionsBase, serverUrl} from '../configs/server.config';
import {ActivatedRoute, Router} from "@angular/router";
import {Option} from "../models/option.model";


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themes: Theme[] = THEME_LIST;
  private themeUrl = serverUrl + '/theme-list';
  private httpOptions = httpOptionsBase;
  private option: Option;

  /*
   Observable which contains the list of the theme.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public themes$: BehaviorSubject<Theme[]>
    = new BehaviorSubject(this.themes);

  public themeSelected$: BehaviorSubject<Theme>;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    // @ts-ignore
    this.themeSelected$ = new BehaviorSubject<Theme>(0);
    this.retrieveThemes();
    this.setOption();
  }
  retrieveThemes(): void {
    this.http.get<Theme[]>(this.themeUrl).subscribe((themeList) => {
      this.themes = themeList;
      this.themes$.next(this.themes);
    });
  }

  setOption(): void {
    const userId = this.route.snapshot.paramMap.get('user');
    const optionUrl = "/option/"+userId;
    this.http.get<Option>(optionUrl).subscribe((option) => {
      this.option = option;
    });

    //console.log(this.option.fontSize);
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

  deleteTheme(theme: Theme): void {
    const urlWithId = this.themeUrl + '/' + theme.id;
    this.http.delete<Theme>(urlWithId, this.httpOptions).subscribe(() => this.retrieveThemes());
  }
}
