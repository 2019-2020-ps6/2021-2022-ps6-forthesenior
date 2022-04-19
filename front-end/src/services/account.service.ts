import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {Account} from '../models/account.model';
import {httpOptionsBase, serverUrl} from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public accountSelected$: Subject<Account> = new Subject();
  public accounts$: BehaviorSubject<Account[]> = new BehaviorSubject([]);
  public accountUrl = serverUrl + '/accounts';
  private accounts: Account[] = [];
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
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
}
