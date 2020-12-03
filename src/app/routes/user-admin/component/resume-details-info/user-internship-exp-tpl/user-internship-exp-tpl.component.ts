import { Component, OnInit, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { differenceInMonths } from 'date-fns';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';
import { UserInternshipExpFormTplComponent } from './user-internship-exp-form-tpl/user-internship-exp-form-tpl.component';
import { ResumeSectionDeletedModalComponent } from '../../resume-section-deleted-modal/resume-section-deleted-modal.component';


@Component({
  selector: 'app-user-internship-exp-tpl',
  templateUrl: './user-internship-exp-tpl.component.html',
  styleUrls: ['./user-internship-exp-tpl.component.less']
})
export class UserInternshipExpTplComponent implements OnInit {

  @Input() resumeInfo: any;

  list: any[] = [];

  constructor(
    private modal: NzModalService,
    private globalService: GlobalSettingsService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.list = this.resumeInfo.practice.data;
  }

  add() {
    this.createModal();
  }

  edit(data: any): void {
    this.createModal(data);
  }

  deleted(data: any): void {
    this.globalService.delete(`/v1/web/user/resume_practice/${data.id}`).subscribe((res: ApiData) => {
      this.msg.success(res.message);
      this.list = this.list.filter(v => v.id !== data.id);
    });
  }

  cancel(): void { }

  createModal(data: any = null): void {
    const modal = this.modal.create({
      nzTitle: (data ? '编辑' : '新增') + '实习经历',
      nzContent: UserInternshipExpFormTplComponent,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 100px 30px'
      },
      nzMaskClosable: false,
      nzComponentParams: {
        data: data,
        resume_id: this.resumeInfo.id
      },
      nzFooter: null
    });

    modal.afterClose.subscribe(result => {
      if (result && result.data) {
        const data = result.data;
        if (data.type === 'edit') {
          this.list = this.list.map(v => v.id === data.data.id ? data.data : v);
        } else {
          this.list.push(data.data);
        }
      }
    });
  }
  deletedModal(data: any): void {
    const modal = this.modal.create({
      nzTitle: '提示',
      nzContent: ResumeSectionDeletedModalComponent,
      nzWidth: '400px',
      nzBodyStyle: {
        padding: '24px'
      },
      nzMaskClosable: false,
      nzComponentParams: {

      },
      nzFooter: null
    });
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      if (result === true) {
        this.deleted(data);
      }
    });
  }

  countMonth(left_time: string, right_time: string): string {
    // 计算两个日期之间相差多少年月，结果如： 2年1个月
    const left: Date = new Date(left_time);
    let end_time: Date;
    if (right_time === '至今') {
      end_time = new Date();
    } else {
      end_time = new Date(right_time);
    }
    const months: number = differenceInMonths(end_time, left);
    let str: string = '';
    const year = Math.floor(months / 12);
    const _mon = months % 12;

    str = (year > 0 ? `${year}年` : '') + (_mon > 0 ? `${_mon}个月` : '');

    return str;
  }
}
