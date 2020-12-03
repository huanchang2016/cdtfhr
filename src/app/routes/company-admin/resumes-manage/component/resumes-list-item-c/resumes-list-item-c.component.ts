import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { environment } from '@env/environment';
import { differenceInYears } from 'date-fns';

@Component({
  selector: 'app-resumes-list-item-c',
  templateUrl: './resumes-list-item-c.component.html',
  styleUrls: ['./resumes-list-item-c.component.less']
})
export class ResumesListItemCComponent implements OnChanges {
  @Input() itemType: string;
  @Input() category: string;
  @Input() Params: string;
  @Input() dataOption: any;
  @Input() loadingData: boolean;
  @Input() posId?: number;

  @Output() pageOptionChanges: EventEmitter<any> = new EventEmitter();

  environment = environment;

  listOfData: any[] = [];

  params: any = {
    origin: 'handle',
    posId: null
  };

  constructor() { }

  pageOption: any = {
    total: 0,
    per_page: 10,
    current_page: 1
  };

  ngOnChanges(): void {
    if (this.dataOption) {
      this.listOfData = this.dataOption.data;
      this.pageOption = this.dataOption.pagination;
    }

    if (this.posId) {
      this.params.posId = this.posId;
    }

    if (this.Params) {
      this.params.params = this.Params;
    }
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;

    this.pageOptionChanges.emit({ pageSize, pageIndex });
  }


  countYears(t: string): string {
    let work_date: string = '';
    if (t) {
      const today: Date = new Date();
      const year = differenceInYears(today, new Date(t));
      work_date = year > 1 ? `${year}年工作经验` : '工作经验不足一年';
    } else {
      work_date = '暂无工作经验'
    }
    return work_date;
  }

  countAge(t: string): number { // 计算 t  至今的时间段（多少年）
    const today: Date = new Date();
    const year: number = differenceInYears(today, new Date(t));
    return year;
  }
}
