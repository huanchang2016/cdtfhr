import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';


@Component({
  selector: 'app-collect-file-form-tpl',
  templateUrl: './collect-file-form-tpl.component.html',
  styleUrls: ['./collect-file-form-tpl.component.less']
})
export class CollectFileFormTplComponent implements OnInit {
  @Input() data?: any;

  file_name: string;

  constructor(
    private modal: NzModalRef,
    public settingService: GlobalSettingsService,
    private msg: NzMessageService
  ) { }

  submitLoading: boolean = false;

  handleCancel() {
    this.submitLoading = false;
    this.destroyModal();
  }

  handleOk() {
    let file_name: string = '';
    if (this.file_name && this.file_name.trim()) {
      file_name = this.file_name.trim();
    }
    if (!file_name) {
      this.msg.warning('文件夹名称未填写');
      return;
    }
    this.submitLoading = true;

    const option = {
      name: file_name
    }
    if (this.data) {
      this.edit(option);
    } else {
      this.create(option);
    }

  }
  create(option: any): void {
    this.settingService.post('/v1/web/com/collect_tag', option).subscribe((res: ApiData) => {
      this.submitLoading = false;
      if (res.code === 200) {
        this.msg.success(res.message)
        this.destroyModal({ name: option.name });
      } else {
        this.msg.error(res.message);
      }
    }, err => this.submitLoading = false)
  }
  edit(option: any): void {
    this.settingService.patch(`/v1/web/com/collect_tag/${this.data.id}`, option).subscribe((res: ApiData) => {
      this.submitLoading = false;
      if (res.code === 200) {
        this.msg.success(res.message)
        this.destroyModal({ name: option.name });
      } else {
        this.msg.error(res.message);
      }
    }, err => this.submitLoading = false)
  }

  destroyModal(data?: any): void {
    this.modal.destroy(data);
  }

  ngOnInit(): void {
    if (this.data) {
      this.file_name = this.data.name;
    }
  }
}
