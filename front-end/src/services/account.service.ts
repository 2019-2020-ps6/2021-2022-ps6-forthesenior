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

  logIn(email: string, password: string, onErrorFunction: () => void) {
    this.http.post<any>(this.accountUrl + '/login', {
      email: email,
      password: password
    }).subscribe((account) => {
      this.setSelectedAccount(account.id);
      this.router.navigate(['account/' + account.id + '/user']);
    }, (error) => {
      if (onErrorFunction !== undefined) onErrorFunction();
      throw error.message + "Invalide Username or Password";
    });
  }
}
