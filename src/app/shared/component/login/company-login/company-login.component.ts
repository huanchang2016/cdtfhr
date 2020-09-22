import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalSettingsService, StartupService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { ForgotPasswordFormComponent } from '../forgot-password-form/forgot-password-form.component';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.less']
})
export class CompanyLoginComponent {


  validateForm: FormGroup;

  error: string = '';

  loading: boolean = false;

  constructor(
    private modal: NzModalRef,
    private modalSrv: NzModalService,
    private fb: FormBuilder,
    private settingService: GlobalSettingsService,
    private startupSrv: StartupService,
    private router: Router,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm);

    if(this.validateForm.valid) {
      console.log(this.validateForm.value, 'login Info');
      const value = this.validateForm.value;
      this.loading = true;
      const option = {
        name: value.username,
        password: value.password
      };
      this.settingService.post('/v1/web/com/login', option).subscribe((res:ApiData) => {
        this.loading = false;
        if(res.code === 200) {
          this.settingService.setToken(res.data);
          // 登录后， 重新获取用户信息
          this.startupSrv.load().then( _ => {
            this.destroyModal({ type: 'success'});
            // window.document.location.reload();
            this.router.navigateByUrl('/admin/company');
          })
        }else {
          this.msg.error(res.message);
        }
      }, err => this.loading = false);
    }
  }

  userModal:any = null;
  fogetPassword():void {
    // 忘记密码
    console.log('忘记密码');
      this.userModal = this.modalSrv.create({
        nzTitle: '忘记密码',
        nzContent: ForgotPasswordFormComponent,
        nzMaskClosable: false,
        nzWidth: '800px',
        nzBodyStyle: {
          padding: '24px 100px 30px'
        },
        nzComponentParams: {},
        // nzViewContainerRef: this.viewContainerRef,
        // nzGetContainer: () => document.body,
        
        // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
        nzFooter: null
      });
      // const instance = this.userModal.getContentComponent();
      // this.userModal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
      // Return a result when closed
      this.userModal.afterClose.subscribe( result => {
        console.log(result, 'close modal， home page: nothing to do !')
        if(result && result.type === 'success') {
          this.settingService.user = null;
        }
      });
  }

  destroyModal(opt?:any): void {
    this.modal.destroy(opt);
  }
}
