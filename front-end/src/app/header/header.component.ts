import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header', templateUrl: './header.component.html', styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() public username = 'Moi';

  constructor(private accountServices: AccountService, private router: Router) {/*
    /*this.accountServices.accountSelected$.asObservable().subscribe((account) => this.username = account.email);
    if (this.username === 'Moi') {
      this.router.navigate(['/connection']);
    }*/
    */
  }

  ngOnInit(): void {
  }
}
