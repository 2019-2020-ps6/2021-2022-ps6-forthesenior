import {Component, OnInit} from '@angular/core';

import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute} from "@angular/router";
import {OptionService} from "../../../services/option.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: User[] = [];
  public selectedUser: User;

  constructor(private userService: UserService, private route: ActivatedRoute, public optionService : OptionService) {
    let idAccount = this.route.snapshot.paramMap.get("idAccount");
    this.userService.setAccount(idAccount);
    this.userService.retrieveUsers();
    this.userService.users$.subscribe((users: User[]) => {
      this.userList = users;
    });
    this.optionService.setAdminOption();
  }

  ngOnInit(): void {
  }

  selectUser(user: User): void {
    this.userService.setSelectedUser(user);
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user);
  }

  option(user: User): void {
    this.userService.setSelectedUser(user);
  }
}
