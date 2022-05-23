import {Component, Input, OnInit} from '@angular/core';

import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';
import {Router} from "@angular/router";
import {setAdminOption} from "../../utils/options.functions";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() public user: User;

  public userList: User[] = [];

  constructor(private router: Router, private userService: UserService) {
    this.userService.users$.subscribe((users: User[]) => {
      this.userList = users;
    });
    setAdminOption();
  }

  ngOnInit(): void {
    this.userService.retrieveUsers();
  }

  selectUser(user: User): void {
    this.userService.setSelectedUser(user.id);
    this.router.navigate([this.router.url + '/' + user.id + '/theme']);
  }

  editUser(): void {
    //this.userService.setSelectedUser(user.id);
    this.router.navigate([this.router.url + '/admin/theme']);
  }

  optionUser(user: User) {
    this.userService.setSelectedUser(user.id);
    this.router.navigate([this.router.url + '/' + user.id + '/option']);
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user);
  }

  stats(): void {
    this.router.navigate([this.router.url + '/stat'])
  }

}
