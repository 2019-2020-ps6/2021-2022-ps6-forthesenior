import {Component, Input, OnInit} from '@angular/core';

import {User} from '../../../../models/user.model';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {

  @Input()
  user: User;

  public min: number = 0;
  public average: number = 0;
  public max: number = 0;
  public cliks=0;


  constructor() {
  }

  ngOnInit(): void {
    this.getStat();
  }

  getStat() {
    this.average = 0;
    if (this.user.stat === undefined) this.user.stat = []
    if (this.user.stat.length == 0) {
      this.min = 0;
      this.max = 0;
    } else {
      this.user.stat.forEach((num) => {
        num = Number(num);
        if (isNaN(this.max) || this.max < num) this.max = num;
        if (isNaN(this.min) || this.min > num) this.min = num;
        this.average += num;
      });
      this.max = Math.round(this.max * 100);
      this.min = Math.round(this.min * 100);
      this.average = this.average / this.user.stat.length;
      this.average = Math.round(this.average * 100);
    }
    if(this.user.clics === undefined) this.user.clics=[]
    if(this.user.clics.length == 0) this.cliks=0
    else{
      this.user.clics.forEach((click) => {
        click = Number(click);
        this.cliks+=click
      })
      this.cliks = this.cliks / this.user.clics.length;
    }
  }
}
