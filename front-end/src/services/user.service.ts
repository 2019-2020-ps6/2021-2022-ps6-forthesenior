import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from '../models/user.model';
import {serverUrl, httpOptionsBase} from '../configs/server.config';
import {ActivatedRoute} from "@angular/router";
import {Option} from "../models/option.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /*
   The list of option.
   */
  private users: User[] = [];

  /*
   Observable which contains the list of the option.
   */
  public users$: BehaviorSubject<User[]>
    = new BehaviorSubject([]);


  private userUrl = serverUrl + '/accounts/';
  private idAccount : string;

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    //console.log("service : " + this.route.snapshot.paramMap.get("idAccount"));
    //this.retrieveUsers();
  }

  setAccount(idAccount : string): void {
    this.idAccount = idAccount;
  }

  retrieveUsers(): void {
    let url = this.userUrl + this.idAccount + "/users"
    this.http.get<User[]>(url).subscribe((userList) => {
      this.users = userList;
      this.users$.next(this.users);


    });
  }

  addUser(user: User): void {
    let url = this.userUrl + this.idAccount + "/users"
    this.http.post<User>(url, user, this.httpOptions).subscribe(() => {
      this.retrieveUsers();
    });
  }

  setSelectedUser(user: User): void {
    //this.userSelected$.next(option);
    /*const urlWithId = this.userUrl + '/' + option.id;
    this.http.get<User>(urlWithId).subscribe((userList) => {
      this.userSelected$.next(userList);
    });*/
  }

  deleteUser(user: User): void {
    let url = this.userUrl + this.idAccount + "/users/" + user.id;
    this.http.delete<User>(url, this.httpOptions).subscribe(() => this.retrieveUsers());

  }
}
