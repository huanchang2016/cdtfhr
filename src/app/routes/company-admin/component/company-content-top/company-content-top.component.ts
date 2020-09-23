import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyDataService } from '../../service/company-data.service';

@Component({
  selector: 'app-company-content-top',
  templateUrl: './company-content-top.component.html',
  styleUrls: ['./company-content-top.component.less'],
  providers: [
    { provide: LOCALE_ID, useValue: 'en' }
  ]
})
export class CompanyContentTopComponent implements OnInit {
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

  constructor(
    private router: Router,
    public companyDataService: CompanyDataService
  ) {
    const day = this.date.getDay();
    this.weekDay = this.weekends[day];
    if(!this.companyDataService.positionConfig) {
      this.companyDataService.getPositionConfig().then();
    }
  }

  ngOnInit(): void {
  }

  navTo(url: string):void {
    this.router.navigateByUrl(url);
  }
}
