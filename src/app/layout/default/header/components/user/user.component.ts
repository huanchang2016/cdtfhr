import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/data/interface';
import { GlobalSettingsService } from '@core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserLoginComponent } from 'src/app/shared/component/user-login/user-login.component';
import { CompanyLoginComponent } from 'src/app/shared/component/company-login/company-login.component';

@Component({
  selector: 'app-header-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line: semicolon
  user: User = null;
  // tslint:disable-next-line: no-trailing-whitespace

  constructor(
    private settingService: GlobalSettingsService,
    private modal: NzModalService
  ) {
    this.getUserInfo();
    
    
  }
  ngOnInit(): void {
  }

  getUserInfo() {
    // 模拟登录信息验证
    this.user = this.settingService.getUser();
    // const _random:number = Math.random();

    // if(_random > 0.5) {
    //   this.user = {
    //     id: 1,
    //     name: '天府新区人力资源开发服务有限公司',
    //     username: 'cdtfhr',
    //     avatar: 'ssss',
    //     token: '10123819477239874',
    //   };
    // }else {
    //   this.user = null;
    // }
  }

  companyModal:any = null;
  userModal:any = null;

  createCompanyModal () {
    this.companyModal = this.modal.create({
      nzTitle: null,
      nzContent: CompanyLoginComponent,
      nzWidth: 455,
      nzStyle: { top: '250px' },
      // nzViewContainerRef: this.viewContainerRef,
      // nzGetContainer: () => document.body,
      
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    const instance = this.companyModal.getContentComponent();
    this.companyModal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    this.companyModal.afterClose.subscribe( result => {
      if(result && result.type === 'success') {
        this.getUserInfo();
      }
    });
  }
  createUserModal () {
    this.userModal = this.modal.create({
      nzTitle: null,
      nzContent: UserLoginComponent,
      nzWidth: 455,
      nzStyle: { top: '250px' },
      // nzViewContainerRef: this.viewContainerRef,
      // nzGetContainer: () => document.body,
      
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    const instance = this.userModal.getContentComponent();
    this.userModal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    this.userModal.afterClose.subscribe( result => {
      if(result && result.type === 'success') {
        this.getUserInfo();
      }
    });

  }

  editpwd() {
    console.log('修改密码');
  }

  logout(user_id: number) {
    this.settingService.clearUser();
  }

  ngOnDestroy() {
   this.modal.closeAll();
  }
}
