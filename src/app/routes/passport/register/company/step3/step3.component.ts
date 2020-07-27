import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransferService } from '../transfer.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.less']
})
export class Step3Component implements OnInit {
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
}
