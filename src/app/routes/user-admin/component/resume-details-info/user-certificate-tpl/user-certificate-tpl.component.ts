import { Component, OnInit, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';
import { UserCertificateFormTplComponent } from './user-certificate-form-tpl/user-certificate-form-tpl.component';
import { ResumeSectionDeletedModalComponent } from '../../resume-section-deleted-modal/resume-section-deleted-modal.component';


@Component({
  selector: 'app-user-certificate-tpl',
  templateUrl: './user-certificate-tpl.component.html',
  styleUrls: ['./user-certificate-tpl.component.less']
})
export class UserCertificateTplComponent implements OnInit {

  @Input() resumeInfo: any;

  list: any[] = [];

  constructor(
    private modal: NzModalService,
    private globalService: GlobalSettingsService,
    private msg: NzMessageService
    // private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.list = this.resumeInfo.certificate.data;
  }

  add() {
    this.createModal();
  }

  edit(data: any): void {
    this.createModal(data);
  }
  deleted(data: any): void {
    this.globalService.delete(`/v1/web/user/resume_certificate/${data.id}`).subscribe((res: ApiData) => {
      this.msg.success(res.message);
      this.list = this.list.filter(v => v.id !== data.id);
    });
  }
  cancel(): void { }

  createModal(data: any = null): void {
    const modal = this.modal.create({
      nzTitle: (data ? '编辑' : '新增') + '证书信息',
      nzContent: UserCertificateFormTplComponent,
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
    // Return a result when closed
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
}
