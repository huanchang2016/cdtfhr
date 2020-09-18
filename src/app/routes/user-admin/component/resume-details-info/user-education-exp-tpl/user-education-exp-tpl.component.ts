import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';
import { EducationExpFormTplComponent } from './education-exp-form-tpl/education-exp-form-tpl.component';
import { UserDataService } from '../../../service/user-data.service';
import { ResumeSectionDeletedModalComponent } from '../../resume-section-deleted-modal/resume-section-deleted-modal.component';

@Component({
  selector: 'app-user-education-exp-tpl',
  templateUrl: './user-education-exp-tpl.component.html',
  styleUrls: ['./user-education-exp-tpl.component.less']
})
export class UserEducationExpTplComponent implements OnInit {

  @Input() resumeInfo:any;

  list:any[] = [];

  constructor(
    private modal: NzModalService,
    private globalService: GlobalSettingsService,
    private msg: NzMessageService,
    private userDataService: UserDataService
    // private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.list = this.resumeInfo.education.data;
  }

  add() {
    this.createModal();
  }

  edit(data:any):void {
    this.createModal(data);
  }
  deleted(data:any):void {
    console.log('删除数据', data);
    this.globalService.delete(`/v1/web/user/resume_edu/${data.id}`).subscribe((res: ApiData) => {
      this.msg.success(res.message);
      this.list = this.list.filter( v => v.id !== data.id);
      if(this.list.length === 0) {
        this.userDataService.getProfile().then();
      }
    });
  }
  cancel():void {}

  createModal(data:any = null):void {
    const modal = this.modal.create({
      nzTitle: ( data ? '编辑' : '新增' )+ '教育经历',
      nzContent: EducationExpFormTplComponent,
      // nzViewContainerRef: this.viewContainerRef,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 100px 30px'
      },
      nzMaskClosable: false,
      // nzGetContainer: () => document.body,
      nzComponentParams: {
        data: data,
        resume_id: this.resumeInfo.id
      },
      // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    // const instance = modal.getContentComponent();
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('[afterClose] The result is:', result)
      if(result && result.data) {
        const data = result.data;
        if(data.type === 'edit') {
          this.list = this.list.map( v => v.id === data.data.id ? data.data : v);
        }else {
          this.list.push(data.data);
          if(this.list.length === 1) {
            this.userDataService.getProfile().then();
          }
        }
      }
    });
  }
  deletedModal(data:any):void {
    const modal = this.modal.create({
      nzTitle: '提示',
      nzContent: ResumeSectionDeletedModalComponent,
      // nzViewContainerRef: this.viewContainerRef,
      nzWidth: '400px',
      nzBodyStyle: {
        padding: '24px'
      },
      nzMaskClosable: false,
      // nzGetContainer: () => document.body,
      nzComponentParams: {
        
      },
      // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    // const instance = modal.getContentComponent();
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('[afterClose] The result is:', result)
      if(result ===  true) {
        this.deleted(data);
      }
    });
  }
}
