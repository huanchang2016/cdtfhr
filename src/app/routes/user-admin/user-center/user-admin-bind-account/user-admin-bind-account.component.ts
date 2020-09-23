import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
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

  validateForm: FormGroup;

  reloading: boolean = false; // flag  是否重新绑定手机号码

  loading: boolean = false;

  constructor(
    private modal: NzModalService,
    // private fb: FormBuilder,
    // private msg: NzMessageService,
    public settingService: GlobalSettingsService,
    public userDataService: UserDataService
  ) {
    this.settingService.setTitle('账号绑定-手机号码更换-个人中心-天府菁英网');
  }

  ngOnInit(): void {
    // this.createForm();
  }

  // createForm():void {
  //   this.validateForm = this.fb.group({
  //     old_phone: [{ value: this.settingService.user.phone, disabled: true }],
  //     old_code: [null, [Validators.required]],
  //     phone: [null, [Validators.required, Validators.pattern(/^1[3456789]\d{9}$/)]],
  //     code: [null, [Validators.required]]
  //   });
  // }

  // rebind(): void {
    // if (this.reloading) {
    //   return;
    // } else {
    //   this.reloading = true;
    //   // this.createForm();
    // }
  // }
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

  // submitForm(): void {
  //   for (const i in this.validateForm.controls) {
  //     this.validateForm.controls[i].markAsDirty();
  //     this.validateForm.controls[i].updateValueAndValidity();
  //   }

  //   console.log(this.validateForm);

  //   if (this.validateForm.get('phone').value === this.validateForm.get('old_phone').value) {
  //     this.msg.error('修改手机号码不能与原号码相同');
  //     return;
  //   }

  //   if (this.validateForm.valid) {
  //     console.log(this.validateForm.value, 'rebind Info');
  //     this.loading = true;
  //     this.settingService.post('/v1/web/user/binding', this.validateForm.value).subscribe((res: ApiData) => {
  //       this.loading = this.reloading = false;
  //       if (res.code === 200) {
  //         this.msg.success(res.message);
  //         this.userDataService.getProfile().then();
  //       } else {
  //         this.msg.error(res.message);
  //       }

  //     }, err => this.loading = this.reloading = false)

  //   }
  // }

  // old_count: number = 60;

  // getOldCaptcha(e: MouseEvent): void {
  //   e.preventDefault();
  //   const user_phone = this.validateForm.get('old_phone');
  //   if (this.is_get_old_captcha) {
  //     this.msg.success('验证码已发送');
  //     return;
  //   } else {
  //     this.settingService.post('/v1/web/send_binding_old_code', { phone: user_phone.value }).subscribe((res: ApiData) => {
  //       this.is_get_old_captcha = true;
  //       this.msg.success('发送成功');
  //       this.counterOld();
  //     }, err => this.is_get_old_captcha = false)
  //   }
  // }

  // counterOld() {
  //   this.old_count = 60;
  //   const new_numbers = interval(1000);
  //   const new_takeFourNumbers = new_numbers.pipe(take(60));
  //   new_takeFourNumbers.subscribe(
  //     x => {
  //       this.old_count = 60 - x - 1;
  //     },
  //     error => { },
  //     () => {
  //       this.is_get_old_captcha = false;
  //     });
  // }

  // new_count: number = 60;

  // getNewCaptcha(e: MouseEvent): void {
  //   e.preventDefault();
  //   const user_phone = this.validateForm.get('phone');
  //   console.log('user_phone, new', user_phone);
  //   this.validateForm.controls['phone'].markAsDirty();
  //   this.validateForm.controls['phone'].updateValueAndValidity();

  //   if (!user_phone.valid) {
  //     return;
  //   }
  //   if (user_phone.value === this.validateForm.get('old_phone').value) {
  //     this.msg.error('修改手机号码不能与原号码相同');
  //     return;
  //   }
  //   if (this.is_get_new_captcha) {
  //     this.msg.success('验证码已发送');
  //     return;
  //   } else {
  //     this.settingService.post('/v1/web/send_binding_code', { phone: user_phone.value }).subscribe((res: ApiData) => {
  //       if (res.code === 200) {
  //         this.is_get_new_captcha = true;
  //         this.msg.success('发送成功');
  //         this.counterNew();
  //       } else {
  //         this.msg.error(res.message)
  //         this.is_get_new_captcha = false;
  //       }

  //     }, err => this.is_get_new_captcha = false)
  //   }
  // }

  // counterNew() {
  //   this.new_count = 60;
  //   const old_numbers = interval(1000);
  //   const old_takeFourNumbers = old_numbers.pipe(take(60));
  //   old_takeFourNumbers.subscribe(
  //     x => {
  //       this.new_count = 60 - x - 1;
  //     },
  //     error => { },
  //     () => {
  //       this.is_get_new_captcha = false;
  //     });
  // }
}
