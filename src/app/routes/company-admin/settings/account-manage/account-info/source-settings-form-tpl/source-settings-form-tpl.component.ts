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
  @Input() sourceInfo:any;

  downloadTotal:number; // 可下载最大次数
  messageTotal:number; // 可发送短信最大次数

  list:any[] = [
    // { id: 1, name: 'zhangsanfeng', msg: { account: 0, max_number: this.messageTotal }, download: { account: 0, max_number: this.downloadTotal }},
    // { id: 2, name: 'jiangerwa', msg: { account: 0, max_number: this.messageTotal }, download: { account: 0, max_number: this.downloadTotal }},
    // { id: 3, name: 'weiweiyanaoke', msg: { account: 0, max_number: this.messageTotal }, download: { account: 0, max_number: this.downloadTotal }},
    // { id: 4, name: 'zhudashaoye', msg: { account: 0, max_number: this.messageTotal }, download: { account: 0, max_number: this.downloadTotal }},
    // { id: 5, name: 'meiqimingyue', msg: { account: 0, max_number: this.messageTotal }, download: { account: 0, max_number: this.downloadTotal }}
  ];

  sharedLoading: boolean = false; // 分配 状态
  recoverLoading: boolean = false; // 回收 状态

  constructor(
    private modal: NzModalRef,
    private msg: NzMessageService,
    public settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    console.log(this.sourceInfo, '分配资源设置');
    this.dealSourceInfo();
  }

  dealSourceInfo():void {
    this.downloadTotal = this.sourceInfo.resume.remain; // 当前可以分配的最大数为 剩余数量
    this.messageTotal = this.sourceInfo.message.remain; // 当前可以分配的最大数为 剩余数量
    // this.downloadTotal = -1; // 模拟数据 为 -1 不限制数量时
    // this.messageTotal = -1; // 模拟数据 为 -1 不限制数量时

    // if(this.sourceInfo.resume.remain > -1) { // 如果简历下载剩余数大于 -1 则计算可以分配的最大数

    // }else {
    //   this.downloadTotal = -1;
    // }

    const list:any[] = this.sourceInfo.account;
    if(list.length !== 0) {
      this.list = list.map(v => {
        v.message['max_number'] = this.messageTotal > 0 ? this.messageTotal : null;
        v.message['account'] = 0;
        v.message['recover_account'] = 0;
        v.resume['max_number'] = this.downloadTotal > 0 ? this.downloadTotal : null;
        v.resume['account'] = 0;
        v.resume['recover_account'] = 0;

        return v;
      });
      console.log('user account list', this.list);
    }else {
      this.list = [];
    }
  }

  msgAccountBlur():void {
    // 分配 短信数目 失去焦点，计算剩余可分配数
    console.log('msg send number change', this.list);
    if(this.messageTotal > 0) {
      const _total:number = this.list.map(item => item.message.account).reduce((a:any, b:any) => a + b, 0); // 计算已填写的分配总数

      this.list = this.list.map( v => {
        v.message.max_number = this.messageTotal - _total + v.message.account;
        return v;
      });
    }
    console.log(this.list, 'count after');
  }

  downloadAccountBlur():void {
    // 分配 简历下载数目 失去焦点，计算剩余可分配数
    console.log('download number change', this.list)
    if(this.downloadTotal > 0) {
      const _total:number = this.list.map(item => item.resume.account).reduce((a:any, b:any) => a + b, 0); // 计算已填写的分配总数

      this.list = this.list.map( v => {
        v.resume.max_number = this.downloadTotal - _total + v.resume.account;
        return v;
      });
    }
    console.log(this.list, 'count after');
  }
  sharedSubmit():void {
    console.log('确认分配', this.list);
    const data:any[] = this.list.map(v => {
      return {
        id: v.id,
        message: v.message.account,
        resume: v.resume.account
      }
    });

    this.sharedLoading = true;
    this.settingService.post('/v1/web/com/add_account_source', { data }).subscribe((res:ApiData) => {
      this.sharedLoading = false;
      console.log(res, '分配数据')
      if(res.code === 200) {
        this.msg.success('分配成功');
        this.getDataInfo();
      }else {
        this.msg.success(res.message);
      }
    }, err => this.sharedLoading = false)
  }

  closeModal() {
    console.log('close Modal');
    this.modal.destroy();
  }

  recoverSubmit() {
    console.log('sljfkalsdjfl submit');
    const data:any[] = this.list.map(v => {
      return {
        id: v.id,
        message: v.message.recover_account,
        resume: v.resume.recover_account
      }
    });

    this.recoverLoading = true;
    this.settingService.post('/v1/web/com/recover_account_source', { data }).subscribe((res:ApiData) => {
      this.recoverLoading = false;
      console.log(res, '回收数据');
      if(res.code === 200) {
        this.msg.success('分配成功');
        this.getDataInfo();
      }else {
        this.msg.success(res.message);
      }
    }, err => this.recoverLoading = false)
  }

  getDataInfo():void { // 重新获取资源分配信息
    this.settingService.get('/v1/web/com/account_source').subscribe((res:ApiData) => {
      console.log('获取资源分配信息', res);
      if(res.code === 200) {
        this.sourceInfo = res.data;
        this.dealSourceInfo();
      }else {
        this.msg.error(res.message);
      }
    });
  }
}
