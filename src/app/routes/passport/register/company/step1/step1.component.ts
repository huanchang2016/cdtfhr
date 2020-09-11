import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransferService } from '../transfer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.less']
})
export class Step1Component implements OnInit {
  validateForm!: FormGroup;
  error: string = '';

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public transferSrv: TransferService,
    private msg: NzMessageService,
    private settingService: GlobalSettingsService
  ) {
    this.settingService.setTitle('企业用户注册-天府菁英网');
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      agree: [false, Validators.required]
    });

    this.validateForm.patchValue(this.transferSrv.companyRegisterOption);
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm, 'steps1', this.validateForm.get('agree').value);
    if(this.validateForm.valid) {
      if(!this.validateForm.get('agree').value) {
        this.msg.error('请选择接受用户服务协议');
        return;
      }

      // Object.assign(this.transferSrv.companyRegisterOption, this.validateForm.value);
      const value = this.validateForm.value;
      const option = {
        name: value.username,
        password: value.password,
        password_confirmation: value.checkPassword
      };
      this.loading = true;
      this.settingService.post('/v1/web/com/register', option).subscribe((res: ApiData) => {
        console.log(res, 'register company account');
        this.loading = false;
        // 注册成功后，直接跳转到下一步，进行信息填写
        this.settingService.setToken(res.data);
        ++this.transferSrv.step;
      }, err => this.loading = false)
    }
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


}
