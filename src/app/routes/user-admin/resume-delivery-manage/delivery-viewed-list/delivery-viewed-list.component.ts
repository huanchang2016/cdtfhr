import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-delivery-viewed-list',
  templateUrl: './delivery-viewed-list.component.html',
  styleUrls: ['./delivery-viewed-list.component.less']
})
export class DeliveryViewedListComponent implements OnInit {
  private router$: Subscription;

  tabs: any[] = [
    {
      key: 'record',
      tab: '已投递'
    },
    {
      key: 'viewed',
      tab: '被查看'
    }
  ];

  pos = 0;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    // this.getDataList();
  }

  ngOnInit(): void {
    this.router$ = this.router.events.pipe(filter(e => e instanceof ActivationEnd)).subscribe(() => this.setActive());
    this.setActive();

    this.validateForm = this.fb.group({
      rangeDate: [null],
      work_address: [null],
      status: [null]
    });
  }

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    const idx = this.tabs.findIndex(w => w.key === key);
    if (idx !== -1) {
      this.pos = idx;
    }
  }


  to(item: any) {
    this.router.navigateByUrl(`/admin/user/delivery/${item.key}`);
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }


  is_more: boolean = false; // 展开更多搜索条件

  validateForm!: FormGroup;

  search_text: string = '';

  loadingData: boolean = true;
  listOfData: any[] = [];


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm, 'validateForm');
  }

  resetForm(): void {
    this.validateForm.reset();
    this.search_text = '';
  }


  showMoreSearch(): void {
    this.is_more = !this.is_more;
  }

  pageConfig = {
    total: 0,
    limit: 10,
    page: 1
  };

  getDataList(total: number = 10) {
    console.log(this.pageConfig, this.validateForm.value, 'get data list works!');

    this.loadingData = true;
    setTimeout(() => {
      this.loadingData = false;
      this.listOfData = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.pageConfig.total = 20;
    }, 800);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    this.getDataList();
  }


}
