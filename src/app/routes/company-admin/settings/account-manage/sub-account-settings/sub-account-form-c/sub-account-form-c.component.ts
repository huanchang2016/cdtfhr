import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-sub-account-form-c',
  templateUrl: './sub-account-form-c.component.html',
  styleUrls: ['./sub-account-form-c.component.less']
})
export class SubAccountFormCComponent implements OnInit {
  @Input() data:any;

  config:any = {
    nature: [
      { id: 1, name: '国有企业' },
      { id: 2, name: '民营企业、私企' },
      { id: 3, name: '政府机关、军队文职' },
      { id: 4, name: '其他外资、合资企业' }
    ],
    salary: [],
    education: [],
    work_exp: [],
    duration_time: []
  };

  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef
  ) { }

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      account_name: [{ value: null, disabled: this.data }, Validators.required ],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      user_member_name: [null, Validators.required ],
      user_member_phone: [null, Validators.required ],
      email: [null ]
    });

    if(this.data) {
      this.validateForm.get('password')!.clearValidators();
      this.validateForm.get('password')!.markAsPristine();
      this.validateForm.get('checkPassword')!.clearValidators();
      this.validateForm.get('checkPassword')!.markAsPristine();

      this.setFormValue();
    }
    this.validateForm.get('password')!.updateValueAndValidity();
    this.validateForm.get('checkPassword')!.updateValueAndValidity();
    
  }

  
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm, '账号设置 表单');
    if(this.validateForm.valid) {

    }
  }

  setFormValue():void {
    console.log('edit account form', this.data);
    this.validateForm.patchValue({
      
    });
  }

  cancel(e:Event):void {
    e.preventDefault();
    this.modal.destroy();
  }
}
