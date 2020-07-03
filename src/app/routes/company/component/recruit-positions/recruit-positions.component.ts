import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruit-positions',
  templateUrl: './recruit-positions.component.html',
  styleUrls: ['./recruit-positions.component.less']
})
export class RecruitPositionsComponent implements OnInit {

  list:any[] = []; // 数据列表
  loadingData:boolean = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadingData = false;
      this.list = [1,2, 3, 4,5,6,7,8,9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    }, 800);
  }
}
