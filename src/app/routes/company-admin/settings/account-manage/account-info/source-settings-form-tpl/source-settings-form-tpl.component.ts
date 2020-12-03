import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-source-settings-form-tpl',
  templateUrl: './source-settings-form-tpl.component.html',
  styleUrls: ['./source-settings-form-tpl.component.less']
})
export class SourceSettingsFormTplComponent implements OnInit {
  @Input() sourceInfo: any;

  downloadTotal: number; // 可下载最大次数
  messageTotal: number; // 可发送短信最大次数

  list: any[] = [];

  sharedLoading: boolean = false; // 分配 状态
  recoverLoading: boolean = false; // 回收 状态

  constructor(
    private modal: NzModalRef,
    private msg: NzMessageService,
    public settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.dealSourceInfo();
  }

  dealSourceInfo(): void {
    this.downloadTotal = this.sourceInfo.resume.remain; // 当前可以分配的最大数为 剩余数量
    this.messageTotal = this.sourceInfo.message.remain; // 当前可以分配的最大数为 剩余数量

    const list: any[] = this.sourceInfo.account;
    if (list.length !== 0) {
      this.list = list.map(v => {
        v.message['max_number'] = this.messageTotal > 0 ? this.messageTotal : null;
        v.message['account'] = 0;
        v.message['recover_account'] = 0;
        v.resume['max_number'] = this.downloadTotal > 0 ? this.downloadTotal : null;
        v.resume['account'] = 0;
        v.resume['recover_account'] = 0;

        return v;
      });
    } else {
      this.list = [];
    }
  }

  msgAccountBlur(): void {
    // 分配 短信数目 失去焦点，计算剩余可分配数
    if (this.messageTotal > 0) {
      const _total: number = this.list.map(item => item.message.account).reduce((a: any, b: any) => a + b, 0); // 计算已填写的分配总数

      this.list = this.list.map(v => {
        v.message.max_number = this.messageTotal - _total + v.message.account;
        return v;
      });
    }
  }

  downloadAccountBlur(): void {
    // 分配 简历下载数目 失去焦点，计算剩余可分配数
    if (this.downloadTotal > 0) {
      const _total: number = this.list.map(item => item.resume.account).reduce((a: any, b: any) => a + b, 0); // 计算已填写的分配总数

      this.list = this.list.map(v => {
        v.resume.max_number = this.downloadTotal - _total + v.resume.account;
        return v;
      });
    }
  }
  sharedSubmit(): void {
    const data: any[] = this.list.map(v => {
      return {
        id: v.id,
        message: v.message.account,
        resume: v.resume.account
      }
    });

    this.sharedLoading = true;
    this.settingService.post('/v1/web/com/add_account_source', { data }).subscribe((res: ApiData) => {
      this.sharedLoading = false;
      if (res.code === 200) {
        this.msg.success('分配成功');
        this.getDataInfo();
      } else {
        this.msg.success(res.message);
      }
    }, err => this.sharedLoading = false)
  }

  closeModal() {
    this.modal.destroy();
  }

  recoverSubmit() {
    const data: any[] = this.list.map(v => {
      return {
        id: v.id,
        message: v.message.recover_account,
        resume: v.resume.recover_account
      }
    });

    this.recoverLoading = true;
    this.settingService.post('/v1/web/com/recover_account_source', { data }).subscribe((res: ApiData) => {
      this.recoverLoading = false;
      if (res.code === 200) {
        this.msg.success('分配成功');
        this.getDataInfo();
      } else {
        this.msg.success(res.message);
      }
    }, err => this.recoverLoading = false)
  }

  getDataInfo(): void { // 重新获取资源分配信息
    this.settingService.get('/v1/web/com/account_source').subscribe((res: ApiData) => {
      if (res.code === 200) {
        this.sourceInfo = res.data;
        this.dealSourceInfo();
      } else {
        this.msg.error(res.message);
      }
    });
  }
}
