import {Component, Input, OnInit} from '@angular/core';

import {User} from '../../../models/user.model';
import {Account} from '../../../models/account.model';
import {UserService} from '../../../services/user.service';
import {Router} from "@angular/router";
import {setAdminOption} from "../../utils/options.functions";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() public user: User;

  public userList: User[] = [];

  private account: Account;

  constructor(private router: Router, private accountService: AccountService, private userService: UserService) {
    this.userService.users$.subscribe((users: User[]) => {
      this.userList = users;
    });
    this.accountService.accountSelected$.asObservable().subscribe((account) => this.account = account);
    this.userService.setAdmin(true);
    setAdminOption();
  }

  ngOnInit(): void {
    this.userService.retrieveUsers();
  }

  selectUser(user: User): void {
    this.userService.setAdmin(false);
    this.userService.setSelectedUser(user.id);
    this.router.navigate([this.router.url + '/' + user.id + '/theme']);
  }

  editUser(): void {
    //this.userService.setSelectedUser(user.id);
    this.userService.setAdmin(true);
    this.router.navigate([this.router.url + '/0/theme']);
    // this.router.navigate([this.router.url + '/admin/theme']);
  }

  optionUser(user: User) {
    this.userService.setSelectedUser(user.id);
    this.userService.setAdmin(false);
    this.router.navigate([this.router.url + '/' + user.id + '/option']);
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user);
  }

  stats(): void {
    this.router.navigate([this.router.url + '/stat'])
  }

  deleteAccount() {
    this.accountService.deleteAccount(this.account);
    this.router.navigate(['/connection'])
  }
}
