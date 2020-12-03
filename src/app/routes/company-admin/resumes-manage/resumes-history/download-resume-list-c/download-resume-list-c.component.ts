import { Component, OnInit, Input } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-download-resume-list-c',
  templateUrl: './download-resume-list-c.component.html',
  styleUrls: ['./download-resume-list-c.component.less']
})
export class DownloadResumeListCComponent implements OnInit {
  @Input() downloadPage: number;

  loadingData: boolean = true;

  listOfData: any[] = [];

  constructor(
    private settingService: GlobalSettingsService
  ) {
    this.settingService.setTitle('简历下载列表-简历库-天府菁英网');
  }

  pageOption: any = {
    total: null,
    pageIndex: 1,
    pageSize: 10
  };


  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.pageOption.pageIndex = pageIndex;
    this.pageOption.pageSize = pageSize;
    this.getDataList();
  }

  ngOnInit(): void { }

  getDataList(): void {
    const page_size: number = this.pageOption.pageSize;
    const pageIndex: number = this.pageOption.pageIndex;

    const option: any = {
      page: pageIndex,
      limit: page_size
    }


    this.loadingData = true;
    this.settingService.get('/v1/web/com/download_resume_jobs', option).subscribe((res: ApiData) => {
      this.loadingData = false;
      this.listOfData = res.data;
      this.pageOption.total = res.meta.pagination.total;
    }, err => this.loadingData = false)

  }
}
