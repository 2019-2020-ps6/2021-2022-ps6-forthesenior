import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from '../models/user.model';
import {httpOptionsBase, serverUrl} from '../configs/server.config';
import {Router} from "@angular/router";
import {urlPopUntil} from "../app/utils/functions";
import {setAdminOption} from "../app/utils/options.functions";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userSelected$: Subject<User> = new Subject();
  public users$: BehaviorSubject<User[]> = new BehaviorSubject([]);
  private users: User[] = [];
  private httpOptions = httpOptionsBase;
  private admin: boolean = false;

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
    if (userId !== 'admin') {
      this.http.get<User>(this.getUserUrl() + '/' + userId).subscribe((userList) => {
        this.userSelected$.next(userList);
      });
    }
  }

  updateStats(user: User, score: number, clicks: number): void {
    if (user.stat === undefined) {
      user.stat = [];
    }
    if(user.clics === undefined){
      user.clics=[];
    }
    user.clics.push(clicks);
    user.stat.push(score);
    this.http.put(this.getUserUrl() + '/' + user.id, user).subscribe(() => this.retrieveUsers());
  }

  deleteUser(user: User): void {
    this.http.delete<User>(this.getUserUrl() + '/' + user.id, this.httpOptions).subscribe(() => this.retrieveUsers());
  }

  getUserUrl(): string {
    return serverUrl + '/accounts/' + this.getAccountIdFromUrl() + '/users';
  }

  getAccountIdFromUrl(): string {
    let id = this.router.url.split('/')[2];
    if (id === undefined) {
      id = urlPopUntil(document.URL, 'user').split('/').pop();
    }
    return id === '' ? undefined : id;
  }

  setAdmin(admin: boolean): void {
    this.admin = admin;
  }

  isAdmin(): boolean {
    if (this.admin) {
      setAdminOption();
      return true;
    }
    return false;
  }
}
