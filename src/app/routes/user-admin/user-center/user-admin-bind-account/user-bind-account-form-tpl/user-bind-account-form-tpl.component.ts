import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { UserDataService } from '../../../service/user-data.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-bind-account-form-tpl',
  templateUrl: './user-bind-account-form-tpl.component.html',
  styleUrls: ['./user-bind-account-form-tpl.component.less']
})
export class UserBindAccountFormTplComponent implements OnInit {

  is_get_old_captcha: boolean = false;
  is_get_new_captcha: boolean = false;

  get_old_captcha_loading: boolean = false;
  get_new_captcha_loading: boolean = false;

  validateForm: FormGroup;

  submitLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modalSrv: NzModalRef,
    private msg: NzMessageService,
    public settingService: GlobalSettingsService,
    private userDataService: UserDataService
  ) { }


  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.validateForm = this.fb.group({
      old_phone: [{ value: this.userDataService.userProfile.phone, disabled: true }],
      old_code: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^1[3456789]\d{9}$/)]],
      code: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }


    if (this.validateForm.get('phone').value === this.validateForm.get('old_phone').value) {
      this.msg.error('修改手机号码不能与原号码相同');
      return;
    }

    if (this.validateForm.valid) {
      this.submitLoading = true;
      this.settingService.post('/v1/web/user/binding', this.validateForm.value).subscribe((res: ApiData) => {
        this.submitLoading = false;
        if (res.code === 200) {
          this.msg.success(res.message);
          this.userDataService.getProfile().then();
          this.destroyModal({ type: 'success' });
        } else {
          this.msg.error(res.message);
        }
      }, err => this.submitLoading = false)

    }
  }

  handleOk(): void {
    this.submitForm();
  }

  handleCancel(e: Event) {
    e.preventDefault();
    this.submitLoading = false;
    this.destroyModal();
  }


  destroyModal(data?: any): void {
    this.modalSrv.destroy(data);
  }

  old_count: number = 60;

  getOldCaptcha(e: MouseEvent): void {
    e.preventDefault();
    const user_phone = this.validateForm.get('old_phone');
    // if (this.is_get_old_captcha) {
    //   this.msg.success('验证码已发送');
    //   return;
    // } else {
    this.get_old_captcha_loading = true;
    this.settingService.post('/v1/web/send_binding_old_code', { phone: user_phone.value }).subscribe((res: ApiData) => {
      this.get_old_captcha_loading = false;
      if (res.code === 200) {
        this.is_get_old_captcha = true;
        this.msg.success('发送成功');
        this.counterOld();
      } else {
        this.msg.error(res.message);
      }

    }, err => this.get_old_captcha_loading = false)
    // }
  }

  counterOld() {
    this.old_count = 60;
    const new_numbers = interval(1000);
    const new_takeFourNumbers = new_numbers.pipe(take(60));
    new_takeFourNumbers.subscribe(
      x => {
        this.old_count = 60 - x - 1;
      },
      error => { },
      () => {
        this.is_get_old_captcha = false;
      });
  }

  new_count: number = 60;

  getNewCaptcha(e: MouseEvent): void {
    e.preventDefault();
    const user_phone = this.validateForm.get('phone');
    this.validateForm.controls['phone'].markAsDirty();
    this.validateForm.controls['phone'].updateValueAndValidity();

    if (!user_phone.valid) {
      return;
    }
    if (user_phone.value === this.validateForm.get('old_phone').value) {
      this.msg.error('修改手机号码不能与原号码相同');
      return;
    }
    // if (this.is_get_new_captcha) {
    //   this.msg.success('验证码已发送');
    //   return;
    // } else {
    this.get_new_captcha_loading = true;
    this.settingService.post('/v1/web/send_binding_code', { phone: user_phone.value }).subscribe((res: ApiData) => {
      this.get_new_captcha_loading = false;
      if (res.code === 200) {
        this.is_get_new_captcha = true;
        this.msg.success('发送成功');
        this.counterNew();
      } else {
        this.msg.error(res.message)
        this.is_get_new_captcha = false;
      }

    }, err => this.get_new_captcha_loading = false)
    // }
  }

  counterNew() {
    this.new_count = 60;
    const old_numbers = interval(1000);
    const old_takeFourNumbers = old_numbers.pipe(take(60));
    old_takeFourNumbers.subscribe(
      x => {
        this.new_count = 60 - x - 1;
      },
      error => { },
      () => {
        this.is_get_new_captcha = false;
      });
  }

}
