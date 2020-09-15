import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { PositionFormComponent } from './position-form/position-form.component';
import { CompanyDataService } from '../../service/company-data.service';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.less']
})
export class PositionListComponent implements OnInit {
  tabIndex: 0 | 1 = 0;

  keywords:string;
  searchOption:any = null;



  tplModal?: NzModalRef;

  constructor(
    private modal: NzModalService,
    public companyDataService: CompanyDataService
  ) { }

  ngOnInit(): void { }

  search(): void {
    console.log(this.searchOption, 'searchOption text info');
    const obj:any = { name: this.keywords };
    this.searchOption = { ...obj };
  }

  changeTab({index}):void {
    console.log(index, 'change tabs, status changed!');
    this.tabIndex = index;
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
      console.log('result', result);
      if(result && this.tabIndex === 0) {
        this.search();
      }
    });

  }
}
