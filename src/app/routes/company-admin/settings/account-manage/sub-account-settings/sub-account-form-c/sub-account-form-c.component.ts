import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-sub-account-form-c',
  templateUrl: './sub-account-form-c.component.html',
  styleUrls: ['./sub-account-form-c.component.less']
})
export class SubAccountFormCComponent implements OnInit {
  @Input() data:any;

  validateForm!: FormGroup;
  submitLoading:boolean = false;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private msg: NzMessageService,
    private settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      account_name: [{ value: this.data ? this.data.name : null, disabled: this.data }, [Validators.required, this.usernameValidator] ],
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
  
  usernameValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (/[\u4E00-\u9FA5]/g.test(control.value)) {
      return { confirm: true, error: true };
    }
    return {};
  };
  
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
      const value:any = this.validateForm.value;
      this.submitLoading = true;
      if(this.data) {
        this.edit(value);
      }else {
        this.create(value);
      }
    }
  }

  create(value:any):void {
    const option:any = {
      name: value.account_name,
      full_name: value.user_member_name,
      password: value.password,
      password_confirmation: value.checkPassword,
      phone: value.user_member_phone,
      email: value.email
    };

    this.settingService.post('/v1/web/com/account', option).subscribe((res:ApiData) => {
      this.submitLoading = false;
      if(res.code === 200) {
        this.msg.success('账号创建成功');
        this.destoryModal({type: 'success'});
      }
    }, err => this.submitLoading = false);
  }

  edit(value:any):void {
    const opt:any = {
      full_name: value.user_member_name,
      phone: value.user_member_phone,
      email: value.email
    };

    this.settingService.patch(`/v1/web/com/account/${this.data.id}`, opt).subscribe((res:ApiData) => {
      this.submitLoading = false;
      if(res.code === 200) {
        this.msg.success('编辑成功');
        this.destoryModal({type: 'success'});
      }else {
        this.msg.error(res.message);
      }
    }, err => this.submitLoading = false);
  }

  setFormValue():void {
    console.log('edit account form', this.data);
    this.validateForm.patchValue({
      user_member_name: this.data.full_name,
      user_member_phone: this.data.phone,
      email: this.data.email
    });
  }

  cancel(e:Event):void {
    e.preventDefault();
    this.destoryModal();
  }

  destoryModal(data?:any):void {
    this.modal.destroy(data);
  }


  resetPassword():void {
    console.log('重置密码');
    this.resetLoading = true;

    this.settingService.post(`/v1/web/com/account_reset`, { id: this.data.id}).subscribe((res:ApiData) => {
      this.resetLoading = false;
      if(res.code === 200) {
        this.isVisible = false;
        this.msg.success('密码重置成功');
      }else{
        this.msg.error(res.message);
      }
    }, err => this.resetLoading = false);
  }

  
  isVisible:boolean = false;
  resetLoading:boolean = false;

  showResetModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.resetPassword();
  }
  handleCancel(): void {
    this.isVisible = false;
  }

}
