import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from '../models/user.model';
import {httpOptionsBase, serverUrl} from '../configs/server.config';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userSelected$: Subject<User> = new Subject();
  public users$: BehaviorSubject<User[]> = new BehaviorSubject([]);
  private users: User[] = [];
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private router: Router) {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    if (!this.getUserUrl().includes('undefined')) {
      this.http.get<User[]>(this.getUserUrl()).subscribe((userList) => {
        this.users = userList;
        this.users$.next(this.users);
      });
    }
  }

  addUser(user: User): void {
    this.http.post<User>(this.getUserUrl(), user, this.httpOptions).subscribe(() => this.retrieveUsers());
  }

  setSelectedUser(userId: string): void {
    this.http.get<User>(this.getUserUrl() + '/' + userId).subscribe((userList) => {
      this.userSelected$.next(userList);
    });
  }

  deleteUser(user: User): void {
    this.http.delete<User>(this.getUserUrl() + '/' + user.id, this.httpOptions).subscribe(() => this.retrieveUsers());
  }

  getUserUrl(): string {
    return serverUrl + '/accounts/' + this.getAccountIdFromUrl() + '/users';
  }

  getAccountIdFromUrl(): string {
    return this.router.url.split('/')[2];
  }
}
