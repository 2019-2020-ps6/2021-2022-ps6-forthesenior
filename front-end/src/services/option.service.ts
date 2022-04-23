import { Injectable } from '@angular/core';
import {Option} from "../models/option.model";
import {ActivatedRoute} from "@angular/router";
import {httpOptionsBase, serverUrl} from "../configs/server.config";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  option : Option;
  userId : string;
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, public route : ActivatedRoute) {
  }

  setOption(id: string): void {
    const optionUrl = serverUrl + "/option/" + id;
    this.http.get<Option>(optionUrl).subscribe((option) => {
      this.option = option[0];
      document.documentElement.style.setProperty("--font-size",this.option.fontSize +"px");
      document.documentElement.style.setProperty("--gap-row","50px");
      document.documentElement.style.setProperty("--gap-column","50px");
      document.documentElement.style.setProperty("--size-answer","15em");
      if(this.option.theme)
        this.setBlackTheme();
      else
        this.setWhiteTheme();

    });
  }

  setAdminOption(): void{
    document.documentElement.style.setProperty("--font-size","20px");
    document.documentElement.style.setProperty("--gap-row","15px");
    document.documentElement.style.setProperty("--gap-column","15px");
    this.setWhiteTheme()
  }

  setBlackTheme():void{
    document.documentElement.style.setProperty("--background-color","#485068");
    document.documentElement.style.setProperty("--header-color","#606060");
    document.documentElement.style.setProperty("--white","#606060");
    document.documentElement.style.setProperty("--text-color","#DFDFDF");
    document.documentElement.style.setProperty("--titre-color","#DFDFDF");
  }

  setWhiteTheme():void{
    document.documentElement.style.setProperty("--background-color","#f2f2f2");
    document.documentElement.style.setProperty("--header-color","blue");
    document.documentElement.style.setProperty("--white","white");
    document.documentElement.style.setProperty("--text-color","blue");
    document.documentElement.style.setProperty("--titre-color","black");
  }

  addOption(option: Option,userId: string):void{
    const optionUrl = serverUrl + "/option/" + userId;
    this.http.post<Option>(optionUrl,option,this.httpOptions).subscribe(() => this.setOption(userId))

  }

}
