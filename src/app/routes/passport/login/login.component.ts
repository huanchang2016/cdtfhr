import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { environment } from '@env/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class UserLoginComponent implements OnDestroy {
  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private startupSrv: StartupService,
    public http: HttpClient,
    public msg: NzMessageService,
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
    modalSrv.closeAll();
  }

  // #region fields

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }
  form: FormGroup;
  error = '';
  type = 0;

  // #region get captcha

  count = 0;
  interval$: any;

  // #endregion

  switch(ret: any) {
    this.type = ret.index;
  }

  getCaptcha() {
    if (this.mobile.invalid) {
      this.mobile.markAsDirty({ onlySelf: true });
      this.mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) {
        clearInterval(this.interval$);
      }
    }, 1000);
  }

  // #endregion

  submit() {
    this.error = '';
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) {
        return;
      }
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) {
        return;
      }
    }

    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.http
      .post('/login/account?_allow_anonymous=true', {
        type: this.type,
        userName: this.userName.value,
        password: this.password.value,
      })
      .subscribe((res: any) => {
        if (res.msg !== 'ok') {
          this.error = res.msg;
          return;
        }
        // 设置用户Token信息
        // this.tokenService.set(res.user);
        // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
        this.startupSrv.load().then(() => {
          // let url = this.tokenService.referrer.url || '/';
          // if (url.includes('/passport')) {
          //   url = '/';
          // }
          // this.router.navigateByUrl(url);
        });
      });
  }

  // #region social

  // #endregion

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
