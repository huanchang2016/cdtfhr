import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { stat } from 'fs';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { CompanyDataService } from '../../service/company-data.service';

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
    total: 0,
    pageIndex: 1,
    pageSize: 10
  };
  pageOptionUnderline:any = {
    total: 0,
    pageIndex: 1,
    pageSize: 10
  };
  constructor(
    public companyDataService: CompanyDataService,
    public settingService: GlobalSettingsService
  ) {
    this.settingService.setTitle('简历收件箱-简历管理-天府菁英网');
    if(!this.companyDataService.positionConfig) {
      this.companyDataService.getPositionConfig().then();
    }
  }

  ngOnInit(): void {
    // this.getPositionConfig();
  }

  getDataList():void {
    const page_size:number = this.status === 'ing' ? this.pageOptionIng.pageSize : this.pageOptionUnderline.pageSize;
    const pageIndex:number = this.status === 'ing' ? this.pageOptionIng.pageIndex : this.pageOptionUnderline.pageIndex;
    const option:any = {
      page: pageIndex,
      limit: page_size,
      status: this.status === 'ing' ? 1 : 0,
      name: this.search_text
    }

    console.log('option by searchs', option);
    
    this.loadingData = true;
    this.settingService.post(`/v1/web/com/resume/jobs`, option).subscribe( (res:ApiData) => {
      console.log(res, '简历收件箱  在招职位列表 works');
      this.loadingData = false;
      if(res.code === 200) {
        const data = res.data;
        if(this.status === 'ing') {
          this.listOfData = data.data;
          // if(this.pageOptionIng.total === 0) {
            this.pageOptionIng.total = data.meta.pagination.total;
            this.positionConfig['on'] = data.meta.pagination.total;
          // }
        }else {
          this.underlineData = data.data;
          // if(this.pageOptionUnderline.total === 0) {
            this.pageOptionUnderline.total = data.meta.pagination.total;
          // }
          this.positionConfig['off'] = data.meta.pagination.total;
        }
      }
    }, err => this.loadingData = false)

    
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

  positionConfig: any = {
    on: null,
    off: null
  };

  // getPositionConfig():void {
    
  //   this.settingService.post(`/v1/web/com/resume/config_jobs`).subscribe( (res:ApiData) => {
  //     console.log(res, '获取在招，已下线职位数量统计');
  //     if(res.code === 200) {
  //      this.positionConfig = res.data;
  //     }
  //   })
  // }

}
