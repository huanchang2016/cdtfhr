import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { differenceInYears } from 'date-fns';

@Component({
  selector: 'app-resumes-list',
  templateUrl: './resumes-list.component.html',
  styleUrls: ['./resumes-list.component.less']
})
export class ResumesListComponent implements OnInit {

  historyData = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ]; // 历史搜索记录

  loadingData:boolean = true;
  listOfData:any[] = [];

  list:any[] = []; // 当前页得数据

  searchOptions:any = {
    pageIndex: 1,
    pageSize: 15,
    sort: 'A'  // 最新 A,  相关度 B
  };
  total = 1; // 总数


  constructor() {}

  getDataList(total: number = 20) {
    this.loadingData = true;
    setTimeout(() => {
      this.loadingData = false;
      this.total = 200;
      this.listOfData = Array.from(new Array(total).keys());
      
    }, 800);
  }


  ngOnInit(): void {
    this.getDataList();
  }

  searchValueChange(option:any):void {
    console.log('search option change', option);
    this.getDataList();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params, 'params');
    // const { pageSize, pageIndex, sort, filter } = params;
    // const currentSort = sort.find(item => item.value !== null);
    // const sortField = (currentSort && currentSort.key) || null;
    // const sortOrder = (currentSort && currentSort.value) || null;
    
  }

  sortChange():void {
    console.log('%csort type changed!','color: #f00', this.searchOptions);
  }

  historyClick(data:any):void {
    console.log('点击历史搜索jil ', data)
  }

  countYears(t:string):number { // 计算 t  至今的时间段（多少年）
    const today:Date = new Date();
    const year:number = differenceInYears(today, new Date(t));
    return year;
  }

}
