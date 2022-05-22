import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Theme} from '../models/theme.model';
import {HttpClient} from '@angular/common/http';
import {httpOptionsBase, serverUrl} from '../configs/server.config';
import {Router} from "@angular/router";
import {urlPopUntil} from "../app/utils/functions";
import {OptionService} from "./option.service";


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public themeSelected$: Subject<Theme> = new Subject();
  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject([]);
  private themes: Theme[] = [];
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private router: Router,
              private optionService: OptionService) {
    this.retrieveThemes();
  }

  retrieveThemes(): void {
    let max;
    switch (this.optionService.size) {
      case 200:
        max = 8;
        break;
      case 300:
        max = 6;
        break;
      case 400:
        max = 4;
        break;
    }
      if (!this.getThemeUrl().includes('undefined')) {
        this.http.get<Theme[]>(this.getThemeUrl()).subscribe((themeList) => {
          this.themes = themeList.slice(0, max);
          this.themes$.next(this.themes);
        });
      }
  }

  addTheme(theme: Theme): void {
    this.http.post<Theme>(this.getThemeUrl(), theme, this.httpOptions).subscribe(() => this.retrieveThemes());
  }

  setSelectedTheme(themeId: string): void {
    this.http.get<Theme>(this.getThemeUrl() + '/' + themeId).subscribe((theme) => {
      this.themeSelected$.next(theme);
    });
  }

  deleteTheme(theme: Theme): void {
    this.http.delete<Theme>(this.getThemeUrl() + '/' + theme.id, this.httpOptions).subscribe(() => this.retrieveThemes());
  }

  getThemeUrl(): string {
    return serverUrl + '/accounts/' + this.getAccountIdFromUrl() + '/themes';
  }

  getAccountIdFromUrl(): string {
    let id = this.router.url.split('/')[2];
    if (id === undefined) {
      id = urlPopUntil(document.URL, 'theme').split('/').pop();
    }
    return id;
  }
}
