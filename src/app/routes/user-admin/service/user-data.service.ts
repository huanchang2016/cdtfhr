import { Injectable } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData, userProfile } from 'src/app/data/interface';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userProfile:userProfile;

  resumeConfigOptions:{[key:string]: Config[]} = {
    marriage: [], // 婚姻状况
    target_type: [], // 工作性质 全职/兼职
    status: [],  // 求职状态
    salary: [], // 期望月薪 k/月
    language: [], // 语言
    education: []  // 学历
    // {
    //   "key": "marriage",
    //   "value": "未婚",
    //   "sort": 1
    // }
  };

  constructor(
    private settingService: GlobalSettingsService
  ) {
    this.getConfigs();
  }

  getProfile():Promise<any> {
    return new Promise((resolve) => {
      this.settingService.get('/v1/web/user/profile').subscribe((res:ApiData) => {
        console.log('UserDataService get Data', res.data);
        this.userProfile = res.data;
        resolve(this.userProfile);
      })
    })
  }

  getConfigs():void {
    this.settingService.get('/v1/web/setting/resume').subscribe((res:ApiData) => {
      this.resumeConfigOptions = res.data;
      console.log(this.resumeConfigOptions, 'configs');
    })
  }
}
