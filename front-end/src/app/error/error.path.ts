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

  public signInForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private http: HttpClient, private accountService: AccountService, private router: Router) {
    this.signInForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  signIn(): void {
    this.accountService.logIn(this.signInForm.getRawValue().email, this.signInForm.getRawValue().password, this.errorConnection)
  }

  errorConnection(): void {
    const defaultBackgroundColor = document.getElementById('signInButton').style.backgroundColor;
    const defaultColor = document.getElementById('signInButton').style.color;
    document.getElementById('signInButton').style.backgroundColor = "#f85d5b";
    document.getElementById('signInButton').style.color = "White";
    setTimeout(() => {
      document.getElementById('signInButton').style.backgroundColor = defaultBackgroundColor;
      document.getElementById('signInButton').style.color = defaultColor;
    }, 500);
  }

  EnterSubmit($event: KeyboardEvent) {
    if ($event.code === "Enter") {
      this.signIn();
    }
  }
}
