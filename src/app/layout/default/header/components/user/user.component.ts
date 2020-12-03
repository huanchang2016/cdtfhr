import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserLoginComponent } from 'src/app/shared/component/login/user-login/user-login.component';
import { CompanyLoginComponent } from 'src/app/shared/component/login/company-login/company-login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line: semicolon
  // tslint:disable-next-line: no-trailing-whitespace

  constructor(
    public settingService: GlobalSettingsService,
    private modal: NzModalService,
    private msg: NzMessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  companyModal: any = null;
  userModal: any = null;

  createCompanyModal() {
    this.companyModal = this.modal.create({
      nzTitle: null,
      nzContent: CompanyLoginComponent,
      nzMaskClosable: false,
      nzWidth: 455,
      nzStyle: { top: '250px' },
      nzFooter: null
    });
  }

  createUserModal() {
    this.userModal = this.modal.create({
      nzTitle: null,
      nzContent: UserLoginComponent,
      nzMaskClosable: false,
      nzWidth: 455,
      nzStyle: { top: '250px' },
      nzFooter: null
    });
  }

  toCenter(): void {
    let path: string = '';
    if (this.settingService.user.type === 'user') {
      path = '/admin/user';
    } else {
      path = '/admin/company';
    }
    this.router.navigateByUrl(path);
  }

  editpwd() {
    // 只有企业用户可以修改密码   
    this.router.navigateByUrl('/admin/company/settings/account/change-password');
  }

  logout() {
    let url: string = '';
    if (this.settingService.user.type === 'user') {
      url = '/v1/web/logout';
    } else {
      url = '/v1/web/com/logout';
    }
    this.settingService.delete(url).subscribe(res => {
      this.msg.success(res.message);
      this.settingService.user = null;
      this.settingService.clearUser();
      const href: string = window.location.href;
      this.router.navigateByUrl('/');

    }, err => { });
  }

  ngOnDestroy() {
    this.modal.closeAll();
  }
}
