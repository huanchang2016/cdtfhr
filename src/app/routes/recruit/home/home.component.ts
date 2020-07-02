import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class RecruitHomeComponent implements OnInit {
  
  searchOption:any = {
    sortValue: 'default',
    salary: null,
    natural: null
  };
  

  list:any[] = []; // 数据列表
  loadingData:boolean = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadingData = false;
      this.list = [1,2, 3, 4,5,6,7,8,9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    }, 800);
  }


  sortValueChange() {
    // this.searchOption = {

    // };
    console.log('sortValue change', this.searchOption);
  }


}
