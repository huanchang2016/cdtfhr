import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserRegisterComponent implements OnInit {
  isGetCode: boolean = false;

  validateForm: FormGroup;
  error: string = '';

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private router: Router,
    private settingService: GlobalSettingsService
  ) {
    this.settingService.setTitle('个人用户注册-天府菁英网');
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      phone: [null, [Validators.required, Validators.pattern(/^1[3456789]\d{9}$/)]],
      code: [null, [Validators.required]],
      agree: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm);
    if (!this.validateForm.get('agree').valid) {
      this.msg.warning('请阅读《用户协议》和《隐私政策》');
    }

    if (this.validateForm.valid) {
      console.log(this.validateForm.value, 'register Info');
      // this.httpClient.post('')
      this.loading = true;
      const opt: any = {
        phone: this.validateForm.value.phone,
        code: this.validateForm.value.code
      };

      this.settingService.post('/v1/web/register', this.validateForm.value).subscribe((res: ApiData) => {
        console.log(res, 'register');
        this.loading = false;
        // 注册成功后，处理用户数据及token，并前往实名认证页面 完成实名认证
        this.settingService.setToken(res.data);
        this.router.navigateByUrl('/admin/user/certification');
      }, err => this.loading = false)
    }
  }

  count: number = 60;

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
    const phone = this.validateForm.get('phone');
    if (!phone.valid) {
      this.msg.error('手机号码未填写');
      return;
    }
    if (this.isGetCode) {
      return;
    } else {
      console.log('send code');
      this.settingService.post('/v1/web/send_reg_code', { phone: phone.value }).subscribe((res: ApiData) => {
        this.isGetCode = true;
        this.msg.success('发送成功');
        this.counter();
      }, err => this.isGetCode = false)
    }
  }

  counter() {
    this.count = 60;
    const numbers = interval(1000);
    const takeFourNumbers = numbers.pipe(take(60));
    takeFourNumbers.subscribe(
      x => {
        this.count = 60 - x - 1;
      },
      error => { },
      () => {
        this.isGetCode = false;
      });
  }

}
