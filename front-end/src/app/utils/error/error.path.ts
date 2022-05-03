import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-connection',
  templateUrl: './error.path.html',
  styleUrls: ['./error.path.scss']
})
// tslint:disable-next-line:component-class-suffix
export class ErrorPath implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    console.log("Error 404: Page Not Found")
  }
}
