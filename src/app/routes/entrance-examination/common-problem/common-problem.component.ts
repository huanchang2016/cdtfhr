import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-common-problem',
  templateUrl: './common-problem.component.html',
  styleUrls: ['./common-problem.component.less']
})
export class CommonProblemComponent implements OnInit {

  total: number = 0;
  limit: number = 10;
  pageIndex: number = 1;

  loading: boolean = true;
  list: any[] = [];

  constructor(
    private settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.getDataList();
  }

  getDataList(): void {
    this.loading = true;
    this.settingService.post('/v1/web/exam/questions', { page: this.pageIndex }).subscribe((res: ApiData) => {
      this.loading = false;
      if (res.code === 200) {
        this.total = res.meta.pagination.total;
        this.limit = res.meta.pagination.per_page;
        this.list = res.data;
      } else {
        this.list = [];
      }
    }, err => this.loading = false)
  }

  pageIndexChange({ page }): void {
    this.pageIndex = page;
    this.getDataList();
  }

}
