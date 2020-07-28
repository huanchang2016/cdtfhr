import { PositionFormComponent } from './position-form/position-form.component';
import { Component, OnInit, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.less']
})
export class PositionListComponent implements OnInit {
  tabIndex: 0 | 1 = 0;
  
  search_text: string = '';
  searchLoading: boolean = false;

  listOfData: any[] = [];
  loadingData: boolean = false;


  tplModal?: NzModalRef;

  constructor(
    private modal: NzModalService,
    // private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {

    this.getDataList();
  }

  search(): void {
    console.log(this.search_text, 'search_ text info');

    this.searchLoading = true;
    setTimeout(() => {
      this.searchLoading = false;
    }, 500);
  }

  
  getDataList(total: number = 10) {
    this.loadingData = true;
    setTimeout(() => {
      this.loadingData = false;
      // this.listOfData = Array.from(new Array(total).keys());
      this.listOfData = Array.from(new Array(total).keys()).map( v => {
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
    }, 800);
  }

  changeTab({index}):void {
    console.log(index, 'change tabs, status changed!');
    this.tabIndex = index;
    const total:number = Math.ceil(Math.random() * 800);
    this.getDataList(total);
  }

  create(): void {
    console.log('create position');
    const modal = this.modal.create({
      nzTitle: '发布新职位',
      nzContent: PositionFormComponent,
      // nzViewContainerRef: this.viewContainerRef,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 100px 30px'
      },
      nzMaskClosable: false,
      // nzGetContainer: () => document.body,
      nzComponentParams: {
        data: null
      },
      nzFooter: null
    });

    // const instance = modal.getContentComponent();
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('[afterClose] The result is:', result)
    });

  }
}
