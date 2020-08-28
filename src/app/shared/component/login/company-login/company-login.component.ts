import { Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService, StartupService } from '@core';
import { Router } from '@angular/router';
import { ApiData } from 'src/app/data/interface';

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
    private startupSrv: StartupService,
    private router: Router
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
      console.log(this.validateForm.value, 'login Info');
      const value = this.validateForm.value;
      this.loading = true;
      const option = {
        name: value.username,
        password: value.password
      };
      this.settingService.post('/v1/web/com/login', option).subscribe((res:ApiData) => {
        this.loading = false;
        console.log(res, 'company login ');
        this.settingService.setToken(res.data);
        // 登录后， 重新获取用户信息
        this.startupSrv.load().then((ss) => {
          this.destroyModal({ type: 'success'});
          // this.router.navigateByUrl('/admin/company');
        })
      }, err => this.loading = false);
    }
  }


  destroyModal(opt?:any): void {
    this.modal.destroy(opt);
  }
}
