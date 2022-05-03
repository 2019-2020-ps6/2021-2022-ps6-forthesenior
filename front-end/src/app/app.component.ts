import {Component} from '@angular/core';
import {setAdminOption} from "./utils/options.functions";

@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    setAdminOption();
  }
}
