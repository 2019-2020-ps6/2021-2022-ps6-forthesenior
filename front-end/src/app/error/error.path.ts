import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AccountService} from '../../services/account.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-connection',
  templateUrl: './error.path.html',
  styleUrls: ['./error.path.scss']
})
// tslint:disable-next-line:component-class-suffix
export class ErrorPath implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }
}
