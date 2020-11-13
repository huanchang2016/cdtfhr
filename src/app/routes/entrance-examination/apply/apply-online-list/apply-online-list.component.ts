import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-apply-online-list',
  templateUrl: './apply-online-list.component.html',
  styleUrls: ['./apply-online-list.component.less']
})
export class ApplyOnlineListComponent implements OnInit {

  total: number = 0;
  limit: number = 10;
  pageIndex: number = 1;

  loading: boolean = true;
  listIng: any[] = [];
  listEnd: any[] = [];

  constructor(
    private settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.getDataList();
  }

  getDataList(): void {
    this.loading = true;
    this.loading = true;
    this.settingService.post('/v1/web/exam/exams', { page: this.pageIndex }).subscribe((res: ApiData) => {
      this.loading = false;
      if (res.code === 200) {
        this.total = res.meta.pagination.total;
        this.limit = res.meta.pagination.per_page;

        const _list: any[] = res.data;
        this.listIng = _list.filter(v => !v.is_end);
        this.listEnd = _list.filter(v => v.is_end);
      } else {
        this.listIng = this.listEnd = [];
      }
    }, err => this.loading = false)
  }

  pageIndexChange({ page }): void {
    this.pageIndex = page;
    this.getDataList();
  }

}
