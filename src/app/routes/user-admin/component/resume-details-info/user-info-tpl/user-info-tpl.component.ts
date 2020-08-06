import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { environment } from '@env/environment';
import { differenceInYears } from 'date-fns';
import { UserInfoFormTplComponent } from './user-info-form-tpl/user-info-form-tpl.component';

@Component({
  selector: 'app-user-info-tpl',
  templateUrl: './user-info-tpl.component.html',
  styleUrls: ['./user-info-tpl.component.less']
})
export class UserInfoTplComponent implements OnInit {
  @Input() resumeInfo:any;
  environment = environment;

  workExpYears:string = '';

  constructor(
    private modal: NzModalService,
    // private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.countYears(this.resumeInfo.work_date);
  }

  editInfo() {
    const modal = this.modal.create({
      nzTitle: '编辑个人信息',
      nzContent: UserInfoFormTplComponent,
      // nzViewContainerRef: this.viewContainerRef,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 100px 30px'
      },
      nzMaskClosable: false,
      // nzGetContainer: () => document.body,
      nzComponentParams: {
        data: this.resumeInfo
      },
      // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    // const instance = modal.getContentComponent();
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('[afterClose] The result is:', result);
      if(result && result.data) {
        this.resumeInfo = Object.assign(this.resumeInfo, result.data);
        this.countYears(this.resumeInfo.work_date);
      }
    });

  }

  
  countYears(t:string) {
    let work_date:string = '';
    if(t) {
      const today:Date = new Date();
      const year = differenceInYears(today, new Date(t));
      work_date = year > 1 ? `${year}年工作经验` : '工作经验不足一年';
    }else {
      work_date = '暂无工作经验'
    }
    this.workExpYears = work_date;
  }
}
