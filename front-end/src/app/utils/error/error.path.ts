import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-connection',
  templateUrl: './error.path.html',
  styleUrls: ['./error.path.scss']
})

export class ErrorPath implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("Error 404: Page Not Found");
  }

  backToConnection() {
    this.router.navigate(["/connection"]);
  }
}
