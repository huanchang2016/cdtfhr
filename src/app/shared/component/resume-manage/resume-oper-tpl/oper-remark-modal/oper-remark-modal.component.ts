import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-oper-remark-modal',
  templateUrl: './oper-remark-modal.component.html',
  styleUrls: ['./oper-remark-modal.component.less']
})
export class OperRemarkModalComponent implements OnInit {
  @Input() resumeInfo: any;

  list: number[] = [];

  remark: string = null;

  constructor(
    private modal: NzModalRef,
    private msg: NzMessageService,
    private settingService: GlobalSettingsService
  ) { }

  submitLoading: boolean = false;
  loading: boolean = false;

  emitData: any = null;

  handleCancel() {
    this.submitLoading = false;
    this.emitData = null;
    this.destroyModal();
  }

  handleOk() {
    let _remark: string = '';
    if (this.remark && this.remark.trim()) {
      _remark = this.remark.trim();
    }
    if (!_remark) {
      this.msg.warning('备注信息内容未填写或不能为空格');
      return;
    }
    const option: any = {
      resume_id: this.resumeInfo.id,
      note: _remark
    }

    this.submitLoading = true;
    this.settingService.post(`/v1/web/com/note/create`, option).subscribe((res: ApiData) => {
      this.submitLoading = false;
      if (res.code === 200) {
        this.msg.success('备注信息添加成功');
        this.emitData = { type: 'success' };
        // this.getDataList();
        this.destroyModal();
      } else {
        this.msg.error(res.message);
        this.emitData = null;
      }
    }, err => this.submitLoading = false)
  }

  destroyModal(): void {
    this.modal.destroy(this.emitData);
  }

  ngOnInit(): void {
    this.getDataList();
  }

  getDataList(): void {
    this.loading = true;
    this.settingService.get(`/v1/web/com/note?resume_id=${this.resumeInfo.id}`).subscribe((res: ApiData) => {
      this.loading = false;
      this.list = res.data;
    }, err => this.loading = false);
  }

}
