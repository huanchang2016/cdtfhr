import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { stat } from 'fs';

@Component({
  selector: 'app-resumes-handle',
  templateUrl: './resumes-handle.component.html',
  styleUrls: ['./resumes-handle.component.less']
})
export class ResumesHandleComponent implements OnInit {

  search_text:string = '';
  loadingData: boolean = false;

  status:'ing' | 'underline' = 'ing';

  listOfData:any[] = [];
  underlineData:any[] = [];

  pageOptionIng:any = {
    total: 179,
    pageIndex: 1,
    pageSize: 20
  };
  pageOptionUnderline:any = {
    total: 100,
    pageIndex: 1,
    pageSize: 10
  };
  
  constructor() { }

  ngOnInit(): void {
  }

  getDataList():void {
    const page_size:number = this.status === 'ing' ? this.pageOptionIng.pageSize : this.pageOptionUnderline.pageSize;
    const pageIndex:number = this.status === 'ing' ? this.pageOptionIng.pageIndex : this.pageOptionUnderline.pageIndex;
    const option:any = {
      page: pageIndex,
      page_size: page_size,
      status: this.status,
      keywords: this.search_text
    }

    console.log('option by searchs', option);
    
    this.loadingData = true;
    setTimeout(() => {
      this.loadingData = false;

      if(this.status === 'ing') {
        this.listOfData = new Array(15);
      }else {
        this.underlineData = new Array(10);
      }
      
    }, 1000);
  }
  
  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex } = params;
    if(this.status === 'ing') {
      // 招聘中
      this.pageOptionIng.pageIndex = pageIndex;
      this.pageOptionIng.pageSize = pageSize;
    }else {
      // 已下线
      this.pageOptionUnderline.pageIndex = pageIndex;
      this.pageOptionUnderline.pageSize = pageSize;
    }
    this.getDataList();
  }

  search(): void {
    console.log(this.search_text, 'search_ text info');
    this.getDataList();
  }

  selectChange(status:'ing' | 'underline'):void {
    console.log(status, 'selectChange');
    this.status = status;
  }

}
