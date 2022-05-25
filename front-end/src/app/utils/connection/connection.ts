import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AccountService} from '../../../services/account.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.html',
  styleUrls: ['./connection.scss']
})
export class Connection implements OnInit {

  public signInForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private http: HttpClient, private accountService: AccountService) {
    this.signInForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  signIn(): void {
    this.accountService.logIn(this.signInForm.getRawValue().email, this.signInForm.getRawValue().password, this.errorConnection);
  }

  signUp() {
    this.accountService.signUp(this.signInForm.getRawValue().email, this.signInForm.getRawValue().password, this.errorConnection);
  }

  errorConnection(id: string): void {
    const defaultBackgroundColor = document.getElementById(id).style.backgroundColor;
    const defaultColor = document.getElementById(id).style.color;
    document.getElementById(id).style.backgroundColor = "#f85d5b";
    document.getElementById(id).style.color = "White";
    setTimeout(() => {
      document.getElementById(id).style.backgroundColor = defaultBackgroundColor;
      document.getElementById(id).style.color = defaultColor;
    }, 500);
  }

  EnterSubmit($event: KeyboardEvent) {
    if ($event.code === "Enter") {
      this.signIn();
    }
  }
}
