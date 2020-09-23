import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { ForgotPasswordFormComponent } from 'src/app/shared/component/login/forgot-password-form/forgot-password-form.component';
import { Router } from '@angular/router';
import { CompanyDataService } from '../../../service/company-data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less']
})
export class ChangePasswordComponent implements OnInit {

  tplModal?: NzModalRef;
  submitLoading = false;

  validateForm!: FormGroup;

  is_get_old_captcha:boolean = false;
  is_get_new_captcha:boolean = false;

  constructor(
    private modal: NzModalService,
    private msg: NzMessageService,
    private fb: FormBuilder,
    private router: Router,
    private companyDataService: CompanyDataService,
    public settingService: GlobalSettingsService
  ) {
    this.settingService.setTitle('修改密码-账号管理-天府菁英网');
  }

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      old_password: [null, [Validators.required]],
      new_password: [null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.new_password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  edit(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>): void {
    this.tplModal = this.modal.create({
      nzTitle: tplTitle,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 100px 30px'
      },
      nzContent: tplContent,
      nzFooter: null,
      nzMaskClosable: false,
      // nzOnOk: () => console.log('Click ok')
    });
  }

  cancel(e:Event):void {
    e.preventDefault();
    this.submitLoading = false;
    this.tplModal!.destroy();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(this.validateForm.valid) {
      this.destroyTplModal();
    }
  }

  destroyTplModal(): void {
    this.submitLoading = true;
    const value:any = this.validateForm.value;
    const option:any = {
      old_password: value.old_password,
      password: value.new_password,
      password_confirmation: value.checkPassword
    };
    this.settingService.post('/v1/web/com/reset_password', option).subscribe((res:ApiData) => {
      this.submitLoading = false;
      if(res.code === 200) {
        this.msg.success('修改成功');
        this.resetPasswordSuccess();
      }else {
        this.msg.error(res.message);
      }
    }, err => this.submitLoading = false);
  }

  userModal:any = null;
  fogetPassword():void {
    // 忘记密码
    console.log('忘记密码');
      this.userModal = this.modal.create({
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
        console.log(result, 'close modal')
        if(result && result.type === 'success') {
          this.resetPasswordSuccess();
        }
      });
  }

  resetPasswordSuccess():void {
    this.modal.closeAll();
    this.settingService.clearUser();
    this.settingService.user = null;
    this.companyDataService.companyInfo = null; // 密码重置成功后，清除用户信息
    this.router.navigateByUrl('/passport/login');
  }
}
