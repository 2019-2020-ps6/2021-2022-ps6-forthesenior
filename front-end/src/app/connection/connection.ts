import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.html',
  styleUrls: ['./connection.scss']
})
// tslint:disable-next-line:component-class-suffix
export class Connection implements OnInit {

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
    this.http.post<any>(this.accountService.accountUrl + '/login', {
      email: this.signInForm.getRawValue().email,
      password: this.signInForm.getRawValue().password
    }).subscribe((accountList) => {
      //this.accountService.setSelectedAccount(accountList.id);
      if (this.router.url === '/connection') this.router.navigate([accountList.id + '/user-list']);
    }, () => this.errorConnection());
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
}
