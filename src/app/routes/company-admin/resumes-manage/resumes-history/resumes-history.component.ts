import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ResumesListColsCComponent } from '../../component/resumes-list-cols-c/resumes-list-cols-c.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resumes-history',
  templateUrl: './resumes-history.component.html',
  styleUrls: ['./resumes-history.component.less']
})
export class ResumesHistoryComponent implements OnInit {
  tabIndex:number = 0; // | 2 | 3 | 4 

  search_text:string = '';
  searchLoading: boolean = false;

  // colsChange:boolean = false;

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params['tabIndex']) {
        this.tabIndex = +params['tabIndex'];
      }
    });
  }

  ngOnInit(): void {
    // this.createComponentModal();
  }

  settingCols():void {
    console.log('settings cols');
    this.createComponentModal();
  }

  createComponentModal(): void {
    const modal = this.modal.create({
      nzTitle: '设置简历列表显示字段',
      nzContent: ResumesListColsCComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '800px',
      nzMaskClosable: false,
      // nzBodyStyle: {
      //   padding: '24px 100px 30px'
      // },
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
      if(result && result.data.save) {
        // this.colsChange = !this.colsChange;
      }
    });

  }

  
  changeTab({index}):void {
    console.log(index, 'change tabs, status changed!');
    this.tabIndex = index;
  }

  
  search(): void {
    console.log(this.search_text, 'search_ text info');

    this.searchLoading = true;
    setTimeout(() => {
      this.searchLoading = false;
    }, 500);
  }
}
