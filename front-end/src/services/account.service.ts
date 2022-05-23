import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {Account} from '../models/account.model';
import {httpOptionsBase, serverUrl} from '../configs/server.config';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public accountSelected$: Subject<Account> = new Subject();
  public accounts$: BehaviorSubject<Account[]> = new BehaviorSubject([]);
  public accountUrl = serverUrl + '/accounts';
  private accounts: Account[] = [];
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private router: Router) {
    this.retrieveAccounts();
  }

  retrieveAccounts(): void {
    this.http.get<Account[]>(this.accountUrl).subscribe((accountList) => {
      this.accounts = accountList;
      this.accounts$.next(this.accounts);
    });
  }

  addAccount(account: Account): void {
    this.http.post<Account>(this.accountUrl, account, this.httpOptions).subscribe(() => this.retrieveAccounts());
  }

  setSelectedAccount(accountId: string): void {
    this.http.get<Account>(this.accountUrl + '/' + accountId).subscribe((account) => {
      this.accountSelected$.next(account);
    });
  }

  deleteAccount(account: Account): void {
    this.http.delete<Account>(this.accountUrl + '/' + account.id, this.httpOptions).subscribe(() => this.retrieveAccounts());
  }

  logIn(email: string, password: string, onErrorFunction: (id: string) => void) {
    console.log("Signing In")
    this.http.post<any>(this.accountUrl + '/signIn', {
      email: email,
      password: password
    }).subscribe((account) => {
      this.setSelectedAccount(account.id);
      this.router.navigate(['account/' + account.id + '/user']);
    }, (error) => {
      if (onErrorFunction !== undefined) onErrorFunction("signInButton");
      throw error.message + " - Invalide Username or Password";
    });
  }

  signUp(email: string, password: string, onErrorFunction: (id: string) => void) {
    console.log("Signing Up")
    this.http.post<any>(this.accountUrl + '/signUp', {
      email: email,
      password: password
    }).subscribe(() => {
      this.addAccount({id: undefined, email: email, password: password});
      this.logIn(email, password, onErrorFunction);
    }, (error) => {
      if (onErrorFunction !== undefined) onErrorFunction("signUpButton");
      throw error.message + " - " + (email.length == 0 ? "Email was empty" :"Email already used");
    });
  }
}
