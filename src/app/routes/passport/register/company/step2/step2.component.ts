import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransferService } from '../transfer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.less']
})
export class Step2Component implements OnInit {
  validateForm!: FormGroup;

  config:any = {
    nature: [],
    scale: [],
    industry: []
  };

  isGetCode:boolean = false; // 获取验证码

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    public transferSrv: TransferService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      companyname: [null, Validators.required],
      or_code: [null, Validators.required ],
      end_date: [null, Validators.required ],
      cascader: [null, Validators.required ],
      address: [null, Validators.required ],
      nature: [null, Validators.required ],
      scale: [null, Validators.required ],
      industry: [null, Validators.required ],
      license_photo: [null, Validators.required ],
      logo: [null, Validators.required ],
      description: [null, [Validators.required, Validators.maxLength(1000)] ],
      // 公司联系人
      user_name: [null, Validators.required ],
      user_phone: [null, Validators.required, Validators.pattern(/^1[3456789]\d{9}$/) ],
      check_number: [null, Validators.required ],
      zj_tel: [null ],
      user_email: [null, Validators.email ]

    });
    
    this.validateForm.patchValue(this.transferSrv.companyRegisterOption);
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm, 'steps2');
    if(this.validateForm.valid) {

      Object.assign(this.transferSrv.companyRegisterOption, this.validateForm.value);

      ++this.transferSrv.step;
    }
  }

  get getTextareaLength():number {
    if(this.validateForm.get('description').value) {
      return this.validateForm.get('description').value.length;
    }
    return 0;
  }


  prev() {
    --this.transferSrv.step;
  }

  count:number = 59;

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
    const user_phone = this.validateForm.get('user_phone');
    if(!user_phone.valid) {
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
