import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {QuizService} from "../../../services/quiz.service";
import {Option} from "../../../models/option.model";
import {OptionService} from "../../../services/option.service";

@Component({
  selector: 'app-user',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  public userId: string;
  public user: User;
  public optionForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public route : ActivatedRoute,
              public userService: UserService, public optionService: OptionService) {
    this.userId = route.snapshot.paramMap.get('idUser');
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      console.log(user.firstName);
    })
    this.optionService.setAdminOption();
  }

  ngOnInit(): void {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      console.log(user);
    })
    this.initializeOptionForm();

  }
  initializeOptionForm():void {
    this.optionForm=this.formBuilder.group({
      fontSize: [''],
      userId:[this.userId]
    })
  }
  addOption(): void{
    const option = this.optionForm.getRawValue() as Option;
    this.optionService.addOption(option,this.userId);
    //console.log(option);


  }




}
