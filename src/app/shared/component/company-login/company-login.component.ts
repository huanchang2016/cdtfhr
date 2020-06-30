import { Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService, StartupService } from '@core';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.less']
})
export class CompanyLoginComponent {


  validateForm: FormGroup;

  error: string = '';

  loading: boolean = false;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private settingService: GlobalSettingsService,
    private startupSrv: StartupService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm);

    if(this.validateForm.valid) {
      console.log(this.validateForm.value, 'company login Info');
      // this.httpClient.post('')
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        // 如果登录错误  this.error = '错误信息'
        this.error = '错误信息'
      }, 1500);

      // 登录后， 重新获取用户信息
      this.startupSrv.load().then(() => {
        this.destroyModal({ type: 'success'});
      })
    }
  }


  destroyModal(opt?:any): void {
    this.modal.destroy(opt);
  }
}
