import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-center',
  templateUrl: './news-center.component.html',
  styleUrls: ['./news-center.component.less']
})
export class NewsCenterComponent implements OnInit {

  total: number = 500;
  limit: number = 10;
  pageIndex: number = 1;

  loading:boolean = true;
  list: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getDataList();
  }

  getDataList():void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }, 2000);
  }

  pageIndexChange({ page }): void {
    console.log(page, 'page changes');
    this.pageIndex = page;
    this.getDataList();
  }

}
