import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserRegisterComponent implements OnInit {
  isGetCode:boolean = false;

  validateForm: FormGroup;
  error: string = '';

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      phone: [null, [Validators.required, Validators.pattern(/^1[3456789]\d{9}$/)]],
      code: [null, [Validators.required]],
      remember: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm);

    if(this.validateForm.valid) {
      console.log(this.validateForm.value, 'register Info');
      // this.httpClient.post('')
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        
      }, 1500);

      // 登录后， 重新获取用户信息
      // this.startupSrv.load().then(() => {
      //   this.destroyModal({ type: 'success'});
      // })
    }
  }

  count:number = 59;

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
    const phone = this.validateForm.get('phone');
    if(!phone.valid) {
      this.msg.error('手机号码未填写');
      return;
    }
    if(this.isGetCode) {
      return;
    }else {
      console.log('send code');
      setTimeout(() => {
        this.isGetCode = true;
        this.counter();
      }, 800);
    }
  }

  counter() {
    const numbers = interval(1000);
    const takeFourNumbers = numbers.pipe(take(60));
    takeFourNumbers.subscribe(
      x => {
        this.count = 60 - x;
      },
      error => {},
      () => {
        this.isGetCode = false;
      });
  }

}
