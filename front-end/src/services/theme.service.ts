import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Theme} from '../models/theme.model';
import {HttpClient} from '@angular/common/http';
import {httpOptionsBase, serverUrl} from '../configs/server.config';
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public themeSelected$: Subject<Theme> = new Subject();
  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject([]);
  private themes: Theme[] = [];
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private router: Router) {
    this.retrieveThemes();
  }

  retrieveThemes(): void {
    if (!this.getThemeUrl().includes('undefined')) {
      this.http.get<Theme[]>(this.getThemeUrl()).subscribe((themeList) => {
        this.themes = themeList;
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
    return this.router.url.split('/')[2];
  }
}
