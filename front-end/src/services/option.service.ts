import { Injectable } from '@angular/core';
import {Option} from "../models/option.model";
import {ActivatedRoute} from "@angular/router";
import {serverUrl} from "../configs/server.config";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  option : Option;
  userId : string;

  constructor(private http: HttpClient, public route : ActivatedRoute) {
  }

  setOption(id: string): void {
    const optionUrl = serverUrl + "/option/" + id;
    this.http.get<Option>(optionUrl).subscribe((option) => {
      this.option = option[0];
      document.documentElement.style.setProperty("--font-size",this.option.fontSize +"px");
      document.documentElement.style.setProperty("--gap-row","150px");
      document.documentElement.style.setProperty("--gap-column","150px");

    });
  }

  setAdminOption(): void{
    document.documentElement.style.setProperty("--font-size","20px");
    document.documentElement.style.setProperty("--gap-row","15px");
    document.documentElement.style.setProperty("--gap-column","15px");
  }

}
