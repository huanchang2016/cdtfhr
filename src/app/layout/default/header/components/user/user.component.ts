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
  ) {}

  ngOnInit(): void {
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
    this.companyModal.afterClose.subscribe( result => console.log(result, 'close modal'));
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
    // const instance = this.userModal.getContentComponent();
    // this.userModal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    this.userModal.afterClose.subscribe( result => {
      console.log(result, 'close modal')
      // if(result.type === 'success') {
        
      // }
    });

  }

  toCenter():void {
    let path: string = '';
    if(this.settingService.user.type === 'user') {
      path = '/admin/user';
    } else {
      path = '/admin/company';
    }
    this.router.navigateByUrl(path);
  }

  editpwd() {
    console.log('修改密码');
    // 只有企业用户可以修改密码   
    this.router.navigateByUrl('/admin/company/settings/account/change-password');
  }

  logout() {
    let url: string = '';
    console.log(this.settingService.user, 'user');
    if(this.settingService.user.type === 'user') {
      url = '/v1/web/logout';
    } else {
      url = '/v1/web/com/logout';
    }
    this.settingService.delete(url).subscribe( res => {
      this.msg.success(res.message);
      this.settingService.user = null;
      this.settingService.clearUser();
      const href:string = window.location.href;
      console.log(href, 'href', href.indexOf('/admin/') !== -1)
      this.router.navigateByUrl('/');
      
    }, err => console.log(err));
  }

  ngOnDestroy() {
   this.modal.closeAll();
  }
}
