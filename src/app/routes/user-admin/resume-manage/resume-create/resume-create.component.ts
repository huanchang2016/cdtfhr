import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAdminInfoFormCComponent } from '../../component/resumes-forms/user-admin-info-form-c/user-admin-info-form-c.component';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-resume-create',
  templateUrl: './resume-create.component.html',
  styleUrls: ['./resume-create.component.less']
})
export class ResumeCreateComponent implements OnInit {

  submitLoading:boolean = false;

  step: 0 | 1 | 2 | 3 | 4 | 5 = 1;

  // 先获取信息，根据信息判断当前用户的实名认证 进行到了哪一步？
  resumeUserInfo:any = null;

  constructor(
    private settingService: GlobalSettingsService
  ) {}

  ngOnInit(): void {}

  @ViewChild('userInfoTpl', { static: false }) userInfoTpl: UserAdminInfoFormCComponent;

  submitInfo() {

    this.userInfoTpl.submitForm().then( form => {
      console.log('res,...', form);
      if(form.valid) {
        this.submitLoading = true;

        let userInfo:FormData = new FormData();
        const object = form.value;
        for (const key in object) {
          if(object[key]) {
            if(key === 'registered_residence') {
              userInfo.append('registered_province_id', object[key][0]);
              userInfo.append('registered_city_id', object[key][1]);
            }else if(key === 'address_city') {
              userInfo.append('work_province_id', object[key][0]);
              userInfo.append('work_city_id', object[key][1]);
            } else {
              userInfo.append(key, object[key]);
            }
          }else {
            continue;
          }
          
          
        }

        this.settingService.post('/v1/web/user/resume/info', userInfo).subscribe((res:ApiData) => {
          console.log(res);
          this.submitLoading = false;
          this.resumeUserInfo = res.data;
          ++this.step;
        }, err => this.submitLoading = false)
        
        // setTimeout(() => {
        //   this.submitLoading = false;
        //   // 在当前组件层级 存入 resume_id 简历id。
        //   ++this.step;
        // }, 800);
      }
    })
  }

  stepsChange(type:string) {
    if(type === 'next') {
      ++this.step;
    }else {
      --this.step;
    }
  }
}
