import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { CompanyDataService } from 'src/app/routes/company-admin/service/company-data.service';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.less']
})
export class ForgotPasswordFormComponent implements OnInit {

  isGetCode:boolean = false;

  validateForm: FormGroup;
  error: string = '';

  loading: boolean = false;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private settingService: GlobalSettingsService,
    private companyDataService: CompanyDataService
  ) {}

  phone: string = '';
  ngOnInit(): void {
    if(this.settingService.user) {
      console.log(this.settingService.user, '重置密码，查看是否已有用户登录信息');
      this.phone = this.settingService.user.phone;
    }
    this.validateForm = this.fb.group({
      phone: [{ value: this.phone, disabled: this.phone }, [Validators.required, Validators.pattern(/^1[3456789]\d{9}$/)]],
      code: [null, [Validators.required]],
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

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm);

    if(this.validateForm.valid) {
      const value = this.validateForm.value;
      const phone = this.validateForm.controls['phone'].value;
      const option:any = {
        phone: phone,
        code: value.code,
        password: value.new_password,
        password_con: value.checkPassword,
      };
      this.loading = true;
      this.settingService.post('/v1/web/find_account', option).subscribe((res:ApiData) => {
        this.loading = false;
        if(res.code === 200) {
          this.msg.success('密码重置成功');
          this.modal.destroy({ type: 'success'});
        }else {
          this.msg.error(res.message);
        }
      }, err => this.loading = false);

    }
  }

  count:number = 60;
  get_captcha_loading:boolean = false;
  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
    const phone = this.validateForm.controls['phone'].value;
    if(!phone) {
      this.msg.error('手机号码未填写');
      return;
    }
    // if(this.isGetCode) {
    //   return;
    // }else {
      this.get_captcha_loading = true;
      console.log('send code');
      this.settingService.post('/v1/web/send_reset_code', { phone: phone }).subscribe((res:ApiData) => {
        this.get_captcha_loading = false;
        if(res.code === 200) {
          this.isGetCode = true;
          this.msg.success('发送成功');
          this.counter();
        }else {
          this.isGetCode = false;
          this.msg.error(res.message);
        }
      }, err => this.get_captcha_loading = false)
    // }
  }

  counter() {
    this.count = 60;
    const numbers = interval(1000);
    const takeFourNumbers = numbers.pipe(take(60));
    takeFourNumbers.subscribe(
      x => {
        this.count = 60 - x - 1;
      },
      error => {},
      () => {
        this.isGetCode = false;
      });
  }

  destroyModal(opt?:any): void {
    this.modal.destroy(opt);
  }

  cancel(e:Event):void {
    e.preventDefault();
    this.loading = false;
    this.destroyModal();
  }
}
