import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService, StartupService } from '@core';
import { Router } from '@angular/router';
import { ApiData } from 'src/app/data/interface';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  
  isGetCode:boolean = false;

  form: FormGroup;
  type = 0;

  errorUser: string = '';
  errorCompany: string = '';

  loading: boolean = false;

  constructor(
    private settingService: GlobalSettingsService,
    private fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private startupSrv: StartupService,
    public msg: NzMessageService,
  ) {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, Validators.required],

      phone: [null, [Validators.required, Validators.pattern(/^1[3456789]\d{9}$/)]],
      code: [null, [Validators.required]]
    });
    modalSrv.closeAll();
  }

  ngOnInit(): void {
    this.settingService.setTitle('用户登录-天府菁英网');
  }

  get userName() {
    return this.form.controls.name;
  }
  get password() {
    return this.form.controls.password;
  }
  get phone() {
    return this.form.controls.phone;
  }
  get code() {
    return this.form.controls.code;
  }

  submitForm(): void {
    this.errorUser = '';
    this.errorCompany = '';

    console.log(this.form, 'login Info');

    if (this.type === 0) {
      console.log(1);
      this.phone.markAsDirty();
      this.phone.updateValueAndValidity();
      this.code.markAsDirty();
      this.code.updateValueAndValidity();
      if (this.phone.invalid || this.code.invalid) {
        this.errorCompany = '请填写用户账号和密码';
        return;
      }
      this.loginUser();
    } else {
      console.log(2);
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) {
        this.errorUser = '请填写用户手机号码和收到的短信验证码';
        return;
      }
      this.loginCompany();
    }

  }

  loginUser():void {
    console.log('user login');
    const opt:any = {
      phone: this.phone.value,
      code: this.code.value
    };
    this.loading = true;
    this.settingService.post('/v1/web/login', opt).subscribe((res:ApiData) => {
      this.loading = false;
      console.log(res, 'login ');
      if(res.code === 200) {
        // 登录后， 重新获取用户信息
        this.settingService.setToken(res.data);
        this.startupSrv.load().then(_ => {
          this.router.navigateByUrl('/admin/user');
        })
      }else {
        this.msg.error(res.message);
      }
      
    }, err => this.loading = false);
  }

  loginCompany():void {
    console.log('company login');
    const opt:any = {
      name: this.userName.value,
      password: this.password.value
    };
    this.loading = true;
    this.settingService.post('/v1/web/com/login', opt).subscribe((res:ApiData) => {
      this.loading = false;
      console.log(res, 'login ');
      if(res.code === 200) {
      // 登录后， 重新获取用户信息
        this.startupSrv.load().then(_ => {
          this.settingService.setToken(res.data);
          this.router.navigateByUrl('/admin/company');
        })
      }else {
        this.msg.error(res.message);
      }
      
    }, err => this.loading = false);
  }

  count:number = 60;

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
    if (this.phone.invalid) {
      this.phone.markAsDirty({ onlySelf: true });
      this.phone.updateValueAndValidity({ onlySelf: true });
      return;
    }
    
    const phone = this.form.get('phone');
    if(!phone.valid) {
      this.msg.error('手机号码未填写');
      return;
    }
    if(this.isGetCode) {
      return;
    }else {
      console.log('send code');
      this.settingService.post('/v1/web/send_login_code', { phone: phone.value }).subscribe((res:ApiData) => {
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
      error => {},
      () => {
        this.isGetCode = false;
      });
  }

  // #region get code

  interval$: any;

  // #endregion

  switch(ret: any) {
    this.type = ret.index;
  }

}
