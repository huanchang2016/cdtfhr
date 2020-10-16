import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apply-online-list',
  templateUrl: './apply-online-list.component.html',
  styleUrls: ['./apply-online-list.component.less']
})
export class ApplyOnlineListComponent implements OnInit {

  total: number = 500;
  limit: number = 10;
  pageIndex: number = 1;

  loading:boolean = true;
  list1: any[] = [];
  list2: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getDataList();
  }

  getDataList():void {
    this.loading = true;
    this.list1 = [];
    this.list2 = [];
    setTimeout(() => {
      this.loading = false;
      this.list1 = [1, 2, 3, 4, 5, 6, 7];
      this.list2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }, 2000);
  }

  pageIndexChange({ page }): void {
    console.log(page, 'page changes');
    this.pageIndex = page;
    this.getDataList();
  }

}
