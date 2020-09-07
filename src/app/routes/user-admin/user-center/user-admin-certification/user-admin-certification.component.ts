import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalSettingsService } from '@core';
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

  // 先获取信息，根据信息判断当前用户的实名认证 进行到了哪一步？

  constructor(
    private fb: FormBuilder,
    public userDataService: UserDataService,
    private settingService: GlobalSettingsService
  ) {}

  ngOnInit(): void {
    if(!this.userDataService.userProfile) {
      this.settingService.get('/v1/web/user/profile').subscribe((res:ApiData) => {
        console.log('UserAdminCertificationComponent get Data', res.data);
        this.userDataService.userProfile = res.data;
        if(res.data && res.data.status === 1) {
          this.step = 2;
        }
      })
    }
    if(this.userDataService.userProfile && this.userDataService.userProfile.status === 1) {
      this.step = 2;
    }
    
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      id_card: [null, [Validators.required, Validators.pattern(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)]]
    });
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
        this.userDataService.getProfile();

        if(res.data.status === 1) {
          this.step = 2;
          // this.settingService.user.name = res.data.name;
        }else if(res.data.status === 2) {
          this.step = 0;
        }else {
          this.step = 1;
        }
      }, err => this.submitLoading = false)
    }
  }

}
