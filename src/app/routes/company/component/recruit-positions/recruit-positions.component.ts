import { Component, OnInit, Input } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-recruit-positions',
  templateUrl: './recruit-positions.component.html',
  styleUrls: ['./recruit-positions.component.less']
})
export class RecruitPositionsComponent implements OnInit {
  @Input() companyId: number;

  list: any[] = []; // 数据列表
  loadingData: boolean = true;

  pageConfig: any = {
    total: 0,
    page_size: 10,
    page: 1
  };

  constructor(
    public settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    // if(this.companyId) {
    // this.getDataList();
    // }
  }


  getDataList() {
    // /v1/web/com/job
    this.loadingData = true;

    const option = {
      limit: this.pageConfig.page_size,
      page: this.pageConfig.page
    };

    this.settingService.get(`/v1/web/com/get_info_job/${this.companyId}`, option).subscribe((res: ApiData) => {
      this.loadingData = false;
      this.list = res.data.data;
      this.pageConfig.total = res.data.meta.pagination.total;
    }, err => this.loadingData = false);

  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;

    this.pageConfig['page_size'] = pageSize;
    this.pageConfig['page'] = pageIndex;

    this.getDataList();
  }

}
