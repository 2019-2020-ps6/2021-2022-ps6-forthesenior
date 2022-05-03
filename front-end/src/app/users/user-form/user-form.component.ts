import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public userForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public userService: UserService) {
    this.initializeForm();
  }

  ngOnInit(): void {
  }

  initializeForm(): void {
    this.userForm = this.formBuilder.group({
      firstname: [''],
      lastname: ['']
    });
  }

  addUser(): void {
    const userToCreate: User = this.userForm.getRawValue() as User;
    this.userService.addUser(userToCreate);
    this.initializeForm();
  }
}
