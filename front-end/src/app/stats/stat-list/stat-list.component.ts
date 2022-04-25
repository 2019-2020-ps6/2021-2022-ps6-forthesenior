import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Theme} from '../../../models/theme.model';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {Quiz} from "../../../models/quiz.model";
import {OptionService} from "../../../services/option.service";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-stats',
  templateUrl: './stat-list.component.html',
  styleUrls: ['./stat-list.component.scss']
})
export class StatListComponent implements OnInit {

  public userList: User[] = [];
  public downloadJsonHref;

  constructor(private route: ActivatedRoute, private userService: UserService, private sanitizer: DomSanitizer) {
    let idAccount = this.route.snapshot.paramMap.get("idAccount");
    this.userService.setAccount(idAccount);
    this.userService.retrieveUsers();
    this.userService.users$.subscribe((users: User[]) => {
      this.userList = users;
    });

    let json = [];
    for (let i = 0; i < this.userList.length; i++) {
      json.push({
        firstName: this.userList[i].firstName,
        lastName: this.userList[i].lastName,
        stat: this.userList[i].stat
      })

    }
    let theJSON = JSON.stringify(json);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
  }

  ngOnInit(): void {
  }
}
