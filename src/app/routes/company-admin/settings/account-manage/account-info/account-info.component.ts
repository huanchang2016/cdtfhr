import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { SourceInfoFormComponent } from './source-info-form/source-info-form.component';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CompanyDataService } from '../../../service/company-data.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.less']
})
export class AccountInfoComponent implements OnInit {

  tplModal?: NzModalRef;

  sourceInfo:any;

  constructor(
    private modal: NzModalService,
    private msg: NzMessageService,
    public settingService: GlobalSettingsService,
    public companyDataService: CompanyDataService
  ) { }

  ngOnInit(): void {
    // 企业 主账号才可以获取资源分配信息
    if(this.companyDataService.companyInfo.is_super) {
      this.getDataInfo();
    }
  }

  getDataInfo():void {
    this.settingService.get('/v1/web/com/account_source').subscribe((res:ApiData) => {
      console.log('获取资源分配信息', res);
      if(res.code === 200) {
        this.sourceInfo = res.data;
      }else {
        this.msg.error(res.message);
      }
    });
  }

  sourceChange():void {
    console.log('change source info');

    this.tplModal = this.modal.create({
      nzTitle: '资源分配设置',
      nzContent: SourceInfoFormComponent,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '0'
      },
      nzMaskClosable: false,
      nzComponentParams: {
        data: null
      },
      nzFooter: null
    });

    // const instance = modal.getContentComponent();
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    this.tplModal.afterClose.subscribe(result => {
      console.log('[afterClose] The result is:', result)
    });
  }

  updateAccountInfo():void {
    console.log('updateAccountInfo 更新账户信息')
  }
  
}
