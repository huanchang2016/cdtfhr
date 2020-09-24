import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { UserDataService } from '../../service/user-data.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserBindAccountFormTplComponent } from './user-bind-account-form-tpl/user-bind-account-form-tpl.component';

@Component({
  selector: 'app-user-admin-bind-account',
  templateUrl: './user-admin-bind-account.component.html',
  styleUrls: ['./user-admin-bind-account.component.less']
})
export class UserAdminBindAccountComponent implements OnInit {

  is_get_old_captcha: boolean = false;
  is_get_new_captcha: boolean = false;

  reloading: boolean = false; // flag  是否重新绑定手机号码

  loading: boolean = false;

  constructor(
    private modal: NzModalService,
    public settingService: GlobalSettingsService,
    public userDataService: UserDataService
  ) {
    this.settingService.setTitle('账号绑定-手机号码更换-个人中心-天府菁英网');
  }

  ngOnInit(): void {
    
  }

  rebind(): void { // 保存
    const modal = this.modal.create({
      nzTitle: '重新设置绑定手机号',
      nzContent: UserBindAccountFormTplComponent,
      nzMaskClosable: false,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 100px 30px'
      },
      // nzViewContainerRef: this.viewContainerRef,
      // nzComponentParams: {
        
      // },
      nzFooter: null
    });
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('[afterClose 更换手机验证码] The result is:', result);
      // if(result && result.type === 'success') {
        // 操作成功后，需要重新获取 记录等信息
        // this.resetConfigs();
      // }
    });

  }
}
