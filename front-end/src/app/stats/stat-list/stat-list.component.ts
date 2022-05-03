import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {DomSanitizer} from "@angular/platform-browser";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stat-list.component.html',
  styleUrls: ['./stat-list.component.scss']
})
export class StatListComponent implements OnInit {

  public userList: User[] = [];
  public downloadJsonHref;

  constructor(private route: ActivatedRoute, private userService: UserService, private accountService: AccountService, private sanitizer: DomSanitizer) {
    let idAccount = this.route.snapshot.paramMap.get("idAccount");
    this.accountService.setSelectedAccount(idAccount);
    this.userService.retrieveUsers();
    this.userService.users$.subscribe((users: User[]) => {
      this.userList = users;
    });

    let json = [];
    for (let i = 0; i < this.userList.length; i++) {
      json.push({
        firstName: this.userList[i].firstname,
        lastName: this.userList[i].lastname,
        stat: this.userList[i].stat
      })

    }
    let theJSON = JSON.stringify(json);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
  }

  ngOnInit(): void {
  }
}
