import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Option} from '../models/option.model';
import {HttpClient} from '@angular/common/http';
import {httpOptionsBase} from '../configs/server.config';
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {urlPopUntil} from "../app/utils/functions";
import {setDarkTheme, setLightTheme} from "../app/utils/options.functions";


@Injectable({
  providedIn: 'root'
})
export class OptionService {

  public optionSelected$: Subject<Option> = new Subject();
  public options$: BehaviorSubject<Option[]> = new BehaviorSubject([]);
  dmla;
  size;
  private options: Option[] = [];
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    this.userService.userSelected$.asObservable().subscribe(() => this.retrieveOptions())
    this.optionSelected$.asObservable().subscribe((option) => this.applyVisualOption(option))
    this.retrieveOptions();
  }

  retrieveOptions(): void {
    if (!this.getOptionUrl().includes('undefined')) {
      this.http.get<Option[]>(this.getOptionUrl()).subscribe((optionList) => {
        this.options = optionList;
        this.options$.next(this.options);
      });
    }
  }

  addOption(option: Option): void {
    this.http.post<Option>(this.getOptionUrl(), option, this.httpOptions).subscribe(() => this.retrieveOptions());
  }

  setSelectedOption(optionId: string): void {
    this.http.get<Option>(this.getOptionUrl() + '/' + optionId).subscribe((option) => {
      this.optionSelected$.next(option);
    });
  }

  updateOption(option: Option): void {
    this.http.put(this.getOptionUrl() + '/' + option.id, option).subscribe(() => this.retrieveOptions());
  }

  applyOption(option: Option): void {
    if (this.options.length > 0) {
      option.id = this.options[0].id;
      this.updateOption(option);
    } else {
      this.addOption(option);
    }
    this.update();
  }

  update(): void {
    if (this.options.length > 0) this.setSelectedOption(this.options[0].id.toString());
  }

  // TODO Add all other visuals and fix bug when going to quizzes without passing by options.
  applyVisualOption(option: Option) {
    this.dmla = option.dmlaOffset;
    this.size = option.fontSize;
    document.documentElement.style.setProperty("--font-size", (option.fontSize / 10) + "px");
    document.documentElement.style.setProperty("--gap-column", option.dmlaOffset + "%");
    //document.documentElement.style.setProperty("--gap-column", "50px");
    document.documentElement.style.setProperty("--size-answer", option.fontSize + "px");
    if (option.theme) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }

  deleteOption(option: Option): void {
    this.http.delete<Option>(this.getOptionUrl() + '/' + option.id, this.httpOptions).subscribe(() => this.retrieveOptions());
  }

  getOptionUrl(): string {
    return this.userService.getUserUrl() + '/' + this.getUserIdFromUrl() + '/options';
  }

  getUserIdFromUrl(): string {
    let id = this.router.url.split('/')[4];
    if (id === undefined) {
      id = urlPopUntil(document.URL, 'option').split('/').pop();
    }
    return id;
  }
}
