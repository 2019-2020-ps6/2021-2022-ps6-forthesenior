import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Option} from '../models/option.model';
import {HttpClient} from '@angular/common/http';
import {httpOptionsBase} from '../configs/server.config';
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {urlPopUntil} from "../app/utils/functions";
import {setDarkTheme, setLightTheme} from "../app/utils/options.functions";
import {User} from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class OptionService {

  public optionSelected$: Subject<Option> = new Subject();
  public options$: BehaviorSubject<Option[]> = new BehaviorSubject([]);
  public dmla;
  public size;
  public theme : boolean;
  //public caseNumber;
  public caseNumber$: Subject<number> = new Subject();
  private options: Option[] = [];
  private httpOptions = httpOptionsBase;
  public timeLeft;
  public caseNumber;
  public userSelected$: Subject<User> = new Subject();

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    this.userService.userSelected$.asObservable().subscribe(() => this.retrieveOptions())
    this.optionSelected$.asObservable().subscribe((option) => this.applyVisualOption(option))
    this.retrieveOptions();
    /*this.caseNumber$.subscribe((caseNumber: number) => {
      this.caseNumber$.next(this.numberColumns(caseNumber));
    });*/
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
    //this.update();
  }

  update(): void {
    if (this.options.length > 0) {
      this.setSelectedOption(this.options[0].id.toString());
    }
  }

  /*update(caseNumber : number): void {
    if (this.options.length > 0) {
      this.setSelectedOption(this.options[0].id.toString());
    }
  }*/

  numberColumns(caseNumber: number): void {
    if (this.options.length > 0) {
      console.log(this.options[0].fontSize === "250")
      if (this.options[0].fontSize !== "250" &&
        this.options[0].dmlaOffset !== "45" &&
        caseNumber > 2) {
       //console.log("okay 1")
        document.documentElement.style.setProperty("--number-column", "3")
        this.caseNumber$.next(9);
      } else {
        //console.log("okay 2")
        document.documentElement.style.setProperty("--number-column", "2")
        if (this.options[0].fontSize === "250") {
          this.caseNumber$.next(4);
        } else {
          this.caseNumber$.next(6);
        }
      }
    }
  }

  // TODO Add all other visuals and fix bug when going to quizzes without passing by options.
  applyVisualOption(option: Option): void {
    console.log(option.id);
    this.dmla = option.dmlaOffset;
    this.size = option.fontSize;
    this.theme = option.theme;
    let height;
    switch (this.size) {
      case "250":
        height = 25;
        break;
      case "200":
        height = 19;
        break;
      case "150":
        height = 14;
        break;
    }
    document.documentElement.style.setProperty("--font-size", (Number(option.fontSize) / 300) + "em");
    document.documentElement.style.setProperty("--gap-column", option.dmlaOffset + "%");
    document.documentElement.style.setProperty("--size-answer", height + "vh");
    if (this.size !== "250" && this.dmla !== "45" && this.caseNumber > 2) {
      document.documentElement.style.setProperty("--number-column", "3")
      if(this.size == "150"){
        this.caseNumber$.next(12);
      } else {
        this.caseNumber$.next(9);
      }
    } else {
      document.documentElement.style.setProperty("--number-column", "2")
      if (this.size === "250") {
        this.caseNumber$.next(4);
      } else {
        this.caseNumber$.next(6);
      }
    }
    if(this.dmla === "0"){
      this.timeLeft = 7;
    } else {
      this.timeLeft = 2;
    }
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
    console.log(this.userService.getUserUrl() + '/' + this.getUserIdFromUrl() + '/options');
    return this.userService.getUserUrl() + '/' + this.getUserIdFromUrl() + '/options';
  }

  getUserIdFromUrl(): string {
    //console.log(this.userService.userSelected$.asObservable().pipe().);
    let id = this.router.url.split('/')[4];
    if (id === undefined) {
      id = urlPopUntil(document.URL, 'option').split('/').pop();
    }
    console.log("id "+id);
    return id;
  }

  setBlackTheme(): void {
    /*document.documentElement.style.setProperty("--background-color","#485068");
    document.documentElement.style.setProperty("--header-color","#606060");
    document.documentElement.style.setProperty("--white","#606060");
    document.documentElement.style.setProperty("--text-color","#DFDFDF");
    document.documentElement.style.setProperty("--titre-color","#DFDFDF");*/

    document.documentElement.style.setProperty("--background-color", "#2C3333");
    document.documentElement.style.setProperty("--header-color", "#395B64");
    document.documentElement.style.setProperty("--white", "#6b7070");
    document.documentElement.style.setProperty("--text-color", "#2666CF");
    document.documentElement.style.setProperty("--titre-color", "#dcd9cf");
    document.documentElement.style.setProperty("--header-text", "#dcd9cf");
  }

  setWhiteTheme(): void {
    document.documentElement.style.setProperty("--background-color", "#F5F2E7");
    document.documentElement.style.setProperty("--header-color", "#2666CF");
    document.documentElement.style.setProperty("--white", "#faf8f3");
    document.documentElement.style.setProperty("--text-color", "#2666CF");
    document.documentElement.style.setProperty("--titre-color", "#2C3333");
    document.documentElement.style.setProperty("--header-text", "#faf8f3");
  }

}
