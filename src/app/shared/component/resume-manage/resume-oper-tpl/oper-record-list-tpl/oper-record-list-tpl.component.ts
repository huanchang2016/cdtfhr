import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-oper-record-list-tpl',
  templateUrl: './oper-record-list-tpl.component.html',
  styleUrls: ['./oper-record-list-tpl.component.less']
})
export class OperRecordListTplComponent implements OnInit {
  @Input() resumeInfo:any;
  
  logs:any[] = [];
  loading: boolean = true;

  constructor(
    private modal: NzModalRef,
    private settingService: GlobalSettingsService
  ) {}


  handleCancel() {
    this.destroyModal();
  }

  destroyModal(): void {
    this.modal.destroy();
  }


  ngOnInit(): void {
    this.settingService.post('/v1/web/com/resume/get_resume_log', { resume_id: this.resumeInfo.id }).subscribe((res:ApiData) => {
      this.loading = false;
      console.log('简历操作记录： get_resume_log works!', res.data);
      this.logs = res.data;
    }, err => this.loading = false);
  }

}
