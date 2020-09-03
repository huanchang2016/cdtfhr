import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';


@Component({
  selector: 'app-oper-download-modal',
  templateUrl: './oper-download-modal.component.html',
  styleUrls: ['./oper-download-modal.component.less']
})
export class OperDownloadModalComponent implements OnInit {
  @Input() resumeInfo:any;

  submitLoading:boolean = false;
  loadingPositions:boolean = true;

  download_num:number;

  list:any[] = [];

  constructor(
    private modal: NzModalRef,
    private msg: NzMessageService,
    private settingService: GlobalSettingsService
  ) {}

  beRelated = false;
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
    console.log(this.setOfCheckedId, 'value', this.setOfCheckedId.size);
    if(this.setOfCheckedId.size > 0) {
      this.beRelated = false;
    }
  }

  selectedChange(checked:any, data:any) {
    if(this.setOfCheckedId.size >= this.download_num && checked) {
      this.msg.warning('已超出最大下载次数');
    }
    this.updateCheckedSet(data.id, checked);
  }

  onAllChecked(checked:boolean):void {
    if(checked) {
      this.setOfCheckedId.clear();
    }
  }

  handleCancel() {
    this.submitLoading = false;
    this.destroyModal();
  }

  handleOk() {
    if(this.setOfCheckedId.size < 1 && !this.beRelated) {
      this.msg.warning('当前简历是否需要关联到职位未选择！');
      return;
    }
    const requestData = this.list.filter(data => this.setOfCheckedId.has(data.id));
    console.log('selected item data: ', requestData);
    this.submitLoading = true;
    // this.settingService.get(`/v1/web/com/download_resume_jobs`).subscribe((res: ApiData) => {
    //   this.submitLoading = false;
      // if(res.code === 200) {
      //   this.msg.success('简历收藏成功');
      //   this.destroyModal({ type: 'success' });
      // }else {
      //   this.msg.error(res.message);
      // }
    // }, err => this.submitLoading = false);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.submitLoading = false;
      this.destroyModal({name: '点击确认提交'});
    }, 1000);
    
  }

  destroyModal(data?:any): void {
    this.modal.destroy(data);
  }


  ngOnInit(): void {
    // 获取 在线的职位列表
    this.settingService.get(`/v1/web/com/all_jobs?resume_id=${this.resumeInfo.id}`).subscribe((res: ApiData) => {
      console.log('getDataList', res);
      this.loadingPositions = false;
      this.list = res.data.companyJob;
      this.download_num = res.data.download_num;
    }, err => this.loadingPositions = false);
  }

}
