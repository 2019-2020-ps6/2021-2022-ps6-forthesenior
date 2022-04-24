import {Injectable} from '@angular/core';
import {Option} from "../models/option.model";
import {ActivatedRoute} from "@angular/router";
import {serverUrl} from "../configs/server.config";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  option: Option;
  userId: string;
  theme: boolean;

  constructor(private http: HttpClient, public route: ActivatedRoute) {
  }

  setOption(id: string): void {
    if (id === '0') {
      this.setAdminOption();
    } else {
      const optionUrl = serverUrl + "/option/" + id;
      this.http.get<Option>(optionUrl).subscribe((option) => {
        this.option = option[0];
        document.documentElement.style.setProperty("--font-size", (this.option.fontSize / 10) + "px");
        document.documentElement.style.setProperty("--gap-column", this.option.dmlaOffset + "%");
        //document.documentElement.style.setProperty("--gap-column", "50px");
        document.documentElement.style.setProperty("--size-answer", this.option.fontSize + "px");
        this.theme = this.option.theme;
        if (this.theme)
          this.setBlackTheme();
        else
          this.setWhiteTheme();
      });
    }

  }

  setAdminOption(): void {
    document.documentElement.style.setProperty("--font-size", "20px");
    document.documentElement.style.setProperty("--size-answer", "200px");
    //document.documentElement.style.setProperty("--gap-row", "15px");
    document.documentElement.style.setProperty("--gap-column", "20px");
    this.setWhiteTheme()
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
