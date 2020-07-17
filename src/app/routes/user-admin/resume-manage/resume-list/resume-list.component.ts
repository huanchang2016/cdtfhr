import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ResumeTitleTplComponent } from '../../component/resume-title-tpl/resume-title-tpl.component';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.less']
})
export class ResumeListComponent implements OnInit {
  list:any[] = [];
  loadingData: boolean = true;

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {

    this.getDataList();
  }

  getDataList() {
    this.loadingData = true;
    setTimeout(() => {
      this.list = [1, 2, 3, 4];
      this.loadingData = false;
    }, 1000);
  }

  isOpen:boolean = false;
  isDefault:boolean = false;

  openValueChange(key:boolean, data:any) {
    console.log(key, 'key', data, 'data', 'open your resume');
  }

  setDefault(key:boolean, data:any) {
    console.log(key, 'key', data, 'data', 'set default resume')
  }

  editResumeName(data:any) {
    console.log('修改简历名称', data);
    this.createModal(data);
  }

  createModal(data:any = null):void {
    const modal = this.modal.create({
      nzTitle: '修改简历名称',
      nzContent: ResumeTitleTplComponent,
      nzViewContainerRef: this.viewContainerRef,
      // nzWidth: '800px',
      // nzBodyStyle: {
      //   padding: '24px 100px 30px'
      // },
      nzMaskClosable: false,
      nzGetContainer: () => document.body,
      nzComponentParams: {
        data: data
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    // const instance = modal.getContentComponent();
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('[afterClose] The result is:', result)
    });
  }

  deleted(data:any) {
    console.log('deleted data', data);

  }

  cancel():void {}
}
