import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';


@Component({
  selector: 'app-oper-collect-modal',
  templateUrl: './oper-collect-modal.component.html',
  styleUrls: ['./oper-collect-modal.component.less']
})
export class OperCollectModalComponent implements OnInit {
  @Input() resumeInfo:any;

  constructor(
    private modal: NzModalRef,
    private msg: NzMessageService,
    private settingService: GlobalSettingsService
  ) {}

  submitLoading:boolean = false;
  loadingFiles:boolean = true;

  handleCancel() {
    this.submitLoading = false;
    this.destroyModal();
  }

  type:number = -1;

  handleOk() {
    if(this.type === -1) {
      this.msg.warning('未选择收藏夹');
      return;
    }
    this.submitLoading = true;
    const opt:any = { resume_id: this.resumeInfo.id, tag_id: this.type };

    this.settingService.post('/v1/web/com/collect/create', opt).subscribe((res:ApiData) => {
      console.log('collect resume in files', res);
      if(res.code === 200) {
        this.msg.success('简历收藏成功');
        this.destroyModal({ type: 'success' });
      }else {
        this.msg.error(res.message);
      }
    }, err => this.submitLoading = false)
  }

  destroyModal(data?:any): void {
    this.modal.destroy(data);
  }

  filesList:any[] = [];

  ngOnInit(): void {
    // 获取 收藏夹列表
    this.settingService.get('/v1/web/com/collect_tag').subscribe((res:ApiData) => {
      console.log('简历库 收藏夹 文件夹', res);
      this.loadingFiles = false;
      const list:any[] = res.data;
      this.filesList = list.sort((a:any, b:any) => b.default - a.default );
    }, err => this.loadingFiles = false)
  }

}
