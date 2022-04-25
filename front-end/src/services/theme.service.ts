import {Injectable} from '@angular/core';
import {BehaviorSubject, ReplaySubject, Subject} from 'rxjs';
import {Theme} from '../models/theme.model';
import {HttpClient} from '@angular/common/http';
import {httpOptionsBase, serverUrl} from '../configs/server.config';
import {ActivatedRoute, Router} from "@angular/router";
import {Option} from "../models/option.model";
import {OptionService} from "./option.service";


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themes: Theme[] = [];
  private themeUrl = serverUrl + '/theme';
  private httpOptions = httpOptionsBase;
  private option: Option;
  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);
  public themeSelected$: BehaviorSubject<Theme>;
  private idUser: string;
  private idAccount : string;

  constructor(private http: HttpClient, private optionService: OptionService) {
    // @ts-ignore
    this.themeSelected$ = new BehaviorSubject<Theme>(0);
    //this.retrieveThemes();
    //this.setOption();
  }

  setIds(idAccount : string, idUser : string){
    this.idAccount = idAccount;
    this.idUser = idUser;
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

  deleteTheme(theme: Theme): void {
    const urlWithId = this.themeUrl + '/' + theme.id;
    this.http.delete<Theme>(urlWithId, this.httpOptions).subscribe(() => this.retrieveThemes());
  }
}
