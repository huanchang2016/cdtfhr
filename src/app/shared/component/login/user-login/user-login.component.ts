import { Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService, StartupService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/routes/user-admin/service/user-data.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.less']
})
export class UserLoginComponent {

  isGetCode:boolean = false;

  validateForm: FormGroup;
  error: string = '';

  loading: boolean = false;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private settingService: GlobalSettingsService,
    private startupSrv: StartupService,
    private router: Router,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      phone: [null, [Validators.required, Validators.pattern(/^1[3456789]\d{9}$/)]],
      code: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm);

    if(this.validateForm.valid) {
      // 判断个人用户是否重新登录   清空缓存的变量数据
      this.userDataService.userProfile = null;

      console.log(this.validateForm.value, 'login Info');
      this.loading = true;
      this.settingService.post('/v1/web/login', this.validateForm.value).subscribe((res:ApiData) => {
        this.loading = false;
        console.log(res, 'login ');
        // this.router.navigateByUrl('/admin/user');
        if(res.code === 200) {
          this.settingService.setToken(res.data);
          // 登录后， 重新获取用户信息
          this.startupSrv.load().then( _ => {
            this.destroyModal({ type: 'success'});
            this.router.navigateByUrl('/admin/user');
          })
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
    const phone = this.validateForm.get('phone');
    if(!phone.valid) {
      this.msg.error('手机号码未填写');
      return;
    }
    // if(this.isGetCode) {
    //   return;
    // }else {
      console.log('send code');
      this.get_captcha_loading = true;
      this.settingService.post('/v1/web/send_login_code', { phone: phone.value }).subscribe((res:ApiData) => {
        this.get_captcha_loading = false;
        if(res.code === 200) {
          this.isGetCode = true;
          this.msg.success('发送成功');
          this.counter();
        }else {
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
}
