import {Component, Input, OnInit} from '@angular/core';

import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input()
  public user: User;

  public userList: User[] = [];

  constructor(private userService: UserService, private router: Router) {
    this.userService.users$.subscribe((users: User[]) => {
      this.userList = users;
    });
  }

  ngOnInit(): void {
    this.userService.retrieveUsers();
  }

  selectUser(user: User): void {
    this.userService.setSelectedUser(user.id);
    this.router.navigate([this.router.url + '/' + user.id + '/themes']);
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user);
  }
}
