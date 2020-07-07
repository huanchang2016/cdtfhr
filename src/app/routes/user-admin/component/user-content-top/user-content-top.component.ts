import { Component, OnInit, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-user-content-top',
  templateUrl: './user-content-top.component.html',
  styleUrls: ['./user-content-top.component.less'],
  providers: [
    { provide: LOCALE_ID, useValue: 'en' }
  ]
})
export class UserContentTopComponent implements OnInit {

  date:Date = new Date();

  weekDay:string = '';

  weekends:string[] = [
    "周日",
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六"
  ];

  constructor() {
    const day = this.date.getDay();
    this.weekDay = this.weekends[day]
  }

  ngOnInit(): void {
  }

}
