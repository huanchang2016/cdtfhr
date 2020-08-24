import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { environment } from '@env/environment';
import { differenceInYears } from 'date-fns';

@Component({
  selector: 'app-resumes-list-item-c',
  templateUrl: './resumes-list-item-c.component.html',
  styleUrls: ['./resumes-list-item-c.component.less']
})
export class ResumesListItemCComponent implements OnChanges {
  @Input() itemType:string;
  @Input() dataOption:any;
  @Input() loadingData:boolean;

  @Output() pageOptionChanges:EventEmitter<any> = new EventEmitter();

  environment = environment;

  params:any = {
    // origin: 'handle',
    // posId: null
  };

  listOfData:any[] = [];

  constructor() {}

  pageOption:any = {
    total: 0,
    per_page: 10,
    current_page: 1
  };

  ngOnChanges(changes:SimpleChanges):void {
    console.log('changes', this.dataOption)
    if(this.dataOption) {
      this.listOfData = this.dataOption.data;
      this.pageOption = this.dataOption.meta.pagination;
    }
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex } = params;
    
    // this.getDataList();
    this.pageOptionChanges.emit({ pageSize, pageIndex });
  }

  // checked = false;
  // indeterminate = false;
  // setOfCheckedId = new Set<number>();

  // updateCheckedSet(id: number, checked: boolean): void {
  //   if (checked) {
  //     this.setOfCheckedId.add(id);
  //   } else {
  //     this.setOfCheckedId.delete(id);
  //   }
  // }

  // onItemChecked(id: number, checked: boolean): void {
  //   this.updateCheckedSet(id, checked);
  //   this.refreshCheckedStatus();
  // }

  // onAllChecked(value: boolean): void {
  //   this.listOfData.forEach(item => this.updateCheckedSet(item.id, value));
  //   this.refreshCheckedStatus();
  // }

  // refreshCheckedStatus(): void {
  //   this.checked = this.listOfData.every(item => this.setOfCheckedId.has(item.id));
  //   this.indeterminate = this.listOfData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  // }

  
  countYears(t:string):string {
    let work_date:string = '';
    if(t) {
      const today:Date = new Date();
      const year = differenceInYears(today, new Date(t));
      work_date = year > 1 ? `${year}年工作经验` : '工作经验不足一年';
    }else {
      work_date = '暂无工作经验'
    }
    return work_date;
  }
  
  countAge(t:string):number { // 计算 t  至今的时间段（多少年）
    const today:Date = new Date();
    const year:number = differenceInYears(today, new Date(t));
    return year;
  }
}
