import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../../models/user.model';
import {Router} from "@angular/router";
import {element} from "protractor";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  deleteUser: EventEmitter<User> = new EventEmitter<User>();

  @Output()
  selectUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(public router : Router) { }

  ngOnInit(): void {
  }

  select(){
    this.selectUser.emit(this.user);
    this.router.navigate(["user-list/" + this.user.id + "/theme-list/"]);
  }

  delete() {
    this.deleteUser.emit(this.user);
  }
}
