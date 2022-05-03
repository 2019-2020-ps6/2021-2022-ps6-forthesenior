import {Component} from '@angular/core';
import {OptionService} from "../services/option.service";

@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private optionService: OptionService) {
    this.optionService.setAdminOption();
  }
}
