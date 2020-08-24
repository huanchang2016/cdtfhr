import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-download-resume-list-c',
  templateUrl: './download-resume-list-c.component.html',
  styleUrls: ['./download-resume-list-c.component.less']
})
export class DownloadResumeListCComponent implements OnInit {
  // @Input() colsChange:boolean;
  
  loadingData:boolean = true;

  listOfData:any[] = [];

  constructor() { }

  // ngOnChanges() {
  //   if(this.listOfData.length !== 0) {
  //     console.log('cols changes', this.colsChange);
  //   }
  // }

  pageOption:any = {
    total: 179,
    pageIndex: 1,
    pageSize: 20
  };
  
  
  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.pageOption.pageIndex = pageIndex;
    this.pageOption.pageSize = pageSize;
    console.log(params, this.pageOption);
    this.getDataList();
  }
  ngOnInit(): void {
    console.log('collect list c');
    this.getDataList();
  }

  getDataList():void {
    const page_size:number = this.pageOption.pageSize;
    const pageIndex:number = this.pageOption.pageIndex;
    const total:number = Math.ceil(Math.random() * 200);
    const option:any = {
      page: pageIndex,
      page_size: page_size,
      total: total
    }

    console.log('option by searchs', option);

    this.loadingData = true;
    setTimeout(() => {
      this.loadingData = false;

      this.listOfData = Array.from(new Array(page_size).keys()).map( v => {
        return {
          id: v + 1,
          name: '产品经理-用户增长',
          resumes_count: 90,
          start_time: '2020-07-22 11:24:23',
          end_time: '2020-09-22 12:00:00',
          province: { id: 1, name: '四川' },
          city: { id: 11, name: '成都' },
          area: { id: 111, name: '武侯区' },
          salary: { id: 1111, name: '15-25K' },
          nature: { id: 11111, name: '金融' },
          peo_amount: { id: 11111, name: '500-2000人' },
          status: Math.random() > 0.5
        }
      });

    }, 1000);
  }
}
