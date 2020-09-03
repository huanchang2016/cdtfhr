import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-oper-remark-list-tpl',
  templateUrl: './oper-remark-list-tpl.component.html',
  styleUrls: ['./oper-remark-list-tpl.component.less']
})
export class OperRemarkListTplComponent implements OnInit {
  @Input() resumeInfo:any;
  
  list:any[] = [];
  loading:boolean = true;

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
    this.loading = true;
    this.settingService.get(`/v1/web/com/note?resume_id=${this.resumeInfo.id}`).subscribe((res: ApiData) => {
      console.log('获取简历备注记录列表', res);
      this.loading = false;
      this.list = res.data;
    }, err => this.loading = false);
  }
}
