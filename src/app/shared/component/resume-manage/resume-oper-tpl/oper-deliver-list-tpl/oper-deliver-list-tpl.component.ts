import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-oper-deliver-list-tpl',
  templateUrl: './oper-deliver-list-tpl.component.html',
  styleUrls: ['./oper-deliver-list-tpl.component.less']
})
export class OperDeliverListTplComponent implements OnInit {
  @Input() resumeInfo: any;
  loading: boolean = true;

  list: any[] = [];

  constructor(
    private modal: NzModalRef,
    private settingService: GlobalSettingsService
  ) { }


  handleCancel() {
    this.destroyModal();
  }


  destroyModal(): void {
    this.modal.destroy();
  }


  ngOnInit(): void {
    this.settingService.get(`/v1/web/com/resume/post_jobs/${this.resumeInfo.id}`).subscribe((res: ApiData) => {
      this.loading = false;
      this.list = res.data;
    }, err => this.loading = false);
  }

}
