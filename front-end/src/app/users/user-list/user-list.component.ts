import {Component, OnInit} from '@angular/core';

import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: User[] = [];
  public selectedUser: User;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    let idAccount = this.route.snapshot.paramMap.get("idAccount");
    this.userService.setAccount(idAccount);
    this.userService.retrieveUsers();
    this.userService.users$.subscribe((users: User[]) => {
      this.userList = users;
    });
  }

  ngOnInit(): void {
  }

  selectUser(user: User): void {
    this.userService.setSelectedUser(user);
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user);
  }
}
