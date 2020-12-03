import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-news-center',
  templateUrl: './news-center.component.html',
  styleUrls: ['./news-center.component.less']
})
export class NewsCenterComponent implements OnInit {

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
    this.settingService.post('/v1/web/exam/news', { page: this.pageIndex }).subscribe((res: ApiData) => {
      this.loading = false;
      if (res.code === 200) {
        this.total = res.meta.pagination.total;
        this.limit = res.meta.pagination.per_page;
        this.list = res.data;
      } else {
        this.list = [];
      }
    })
  }

  pageIndexChange({ page }): void {
    this.pageIndex = page;
    this.getDataList();
  }

}
