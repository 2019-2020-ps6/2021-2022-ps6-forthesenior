import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {DomSanitizer} from "@angular/platform-browser";
import {AccountService} from "../../../services/account.service";
import {download} from "../../utils/functions";

@Component({
  selector: 'app-stats',
  templateUrl: './stat-list.component.html',
  styleUrls: ['./stat-list.component.scss']
})
export class StatListComponent implements OnInit {

  public userList: User[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService, private accountService: AccountService, private sanitizer: DomSanitizer) {
    this.userService.users$.asObservable().subscribe(users => this.userList = users);
  }

  ngOnInit(): void {
    this.userService.retrieveUsers();
  }

  download() {
    console.log("Downloading Statistics")
    let json = [];
    for (let i = 0; i < this.userList.length; i++) {
      json.push({
        firsname: this.userList[i].firstname,
        lastname: this.userList[i].lastname,
        stat: this.userList[i].stat
      })
    }
    download("Statistics.json", JSON.stringify(json));
  }
}
