import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalSettingsService, StartupService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';
import { UserDataService } from '../../service/user-data.service';

@Component({
  selector: 'app-user-admin-certification',
  templateUrl: './user-admin-certification.component.html',
  styleUrls: ['./user-admin-certification.component.less']
})
export class UserAdminCertificationComponent implements OnInit {
  validateForm!: FormGroup;

  submitLoading:boolean = false;

  step: 0 | 1 | 2 = 0;

  // status: 'wait' | 'process' | 'finish' | 'error' = 'wait';
  status: string;

  // 先获取信息，根据信息判断当前用户的实名认证 进行到了哪一步？

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private startupSrv: StartupService,
    public userDataService: UserDataService,
    private settingService: GlobalSettingsService
  ) {
    this.settingService.setTitle('实名认证-个人中心-天府菁英网');
  }

  ngOnInit(): void {
    
    if(this.userDataService.userProfile) {
      // if(this.userDataService.userProfile.status === 1) {
      //   this.step = 2;
      //   this.status = 'finish';
      // }else {
      //   this.status = 'process';
      // }
      this.checkStepStatus(this.userDataService.userProfile);
    }else {
      this.settingService.get('/v1/web/user/profile').subscribe((res:ApiData) => {
        console.log('UserAdminCertificationComponent get Data', res.data);
        this.userDataService.userProfile = res.data;
        // if(res.data && res.data.status === 1) {
        //   this.step = 2;
        //   this.status = 'finish';
        // }else {
        //   this.status = 'process';
        // }
        if(res.code === 200) {
          this.checkStepStatus(res.data);
        }
        
      })
    }
    
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      id_card: [null, [Validators.required, Validators.pattern(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)]]
    });
  }

  checkStepStatus(data:any):void {
    console.log('data', data)
    if(data.status === 1) {
      this.step = 2;
      this.status = 'finish';
    }else if(data.status === 2) {
      this.step = 0;
      this.status = 'error';
    }else {
      this.step = 0;
      this.status = 'process';
    }
  }
  
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm, '实名认证');
    if(this.validateForm.valid) {
      this.submitLoading = true;
      
      this.settingService.post('/v1/web/user/authenticate', this.validateForm.value).subscribe((res:ApiData) => {
        this.submitLoading = false;
        if(res.code === 200 && res.data) {

          this.userDataService.getProfile();

          this.startupSrv.load().then();

          this.checkStepStatus(res.data);

        }else {
          this.msg.error(res.message);
        }
        
      }, err => this.submitLoading = false)
    }
  }

}
