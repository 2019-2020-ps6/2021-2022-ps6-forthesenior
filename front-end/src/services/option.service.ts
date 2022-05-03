import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Option} from '../models/option.model';
import {HttpClient} from '@angular/common/http';
import {httpOptionsBase} from '../configs/server.config';
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {urlPopUntil} from "../app/utils/functions";


@Injectable({
  providedIn: 'root'
})
export class OptionService {

  public optionSelected$: Subject<Option> = new Subject();
  public options$: BehaviorSubject<Option[]> = new BehaviorSubject([]);
  private options: Option[] = [];
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
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

  deleteOption(option: Option): void {
    this.http.delete<Option>(this.getOptionUrl() + '/' + option.id, this.httpOptions).subscribe(() => this.retrieveOptions());
  }

  getOptionUrl(): string {
    return this.userService.getUserUrl() + '/' + this.getUserIdFromUrl() + '/options';
  }

  getUserIdFromUrl(): string {
    let id = this.router.url.split('/')[2];
    if (id === undefined) {
      id = urlPopUntil(document.URL, 'option').split('/').pop();
    }
    return id;
  }
}
