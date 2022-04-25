import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {Account} from "../../models/account.model";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {urlPopUntill} from "../utils/functions";

@Component({
  selector: 'app-header', templateUrl: './header.component.html', styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() public nameShown = 'Pas Connecté';
  private selectedAccount: Account = undefined;
  private selectedUser: User = undefined;

  constructor(private accountServices: AccountService, private userService: UserService, private router: Router) {
    this.accountServices.accountSelected$.asObservable().subscribe((account) => {
      this.selectedAccount = account
      if (account !== undefined && this.nameShown === 'Pas Connecté') {
        this.nameShown = 'Admin: ' + account.email;
        this.selectedUser = undefined;
      }
    });
    this.userService.userSelected$.asObservable().subscribe((user) => {
      this.selectedUser = user
      this.nameShown = this.selectedUser.firstname + " " + this.selectedUser.lastname;
    });
    this.reConnection();
  }

  ngOnInit(): void {
  }

  goToHome(): string {
    if (this.selectedUser !== undefined) return '/account/' + this.selectedAccount.id + '/user/' + this.selectedUser.id + '/theme'
    return this.router.url;
  }

  goToUsers(): string {
    if (this.selectedAccount !== undefined) return '/account/' + this.selectedAccount.id + '/user'
    return this.router.url;
  }

  goToConnection() {
    return 'connection';
  }

  connectedToAccount(): boolean {
    const url = document.URL;
    if (url.includes("account/")) {
      const urlRoutes = urlPopUntill(url.split('/').reverse().join('/'), 'account')
      this.accountServices.setSelectedAccount(urlRoutes.split('/').pop());
      return true;
    }
    return false;
  }

  connectedToUser(): boolean {
    const url = document.URL;
    if (url.includes("user/")) {
      const urlRoutes = urlPopUntill(url.split('/').reverse().join('/'), 'user')
      this.userService.setSelectedUser(urlRoutes.split('/').pop());
      return true;
    }
    return false;
  }

  private reConnection() {
    if (this.connectedToAccount()) {
      if (!this.connectedToUser()) {
        this.goToUsers();
      }
    } else {
      this.router.navigate([this.goToConnection()]);
    }
  }
}
