import { Injectable } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData, userProfile } from 'src/app/data/interface';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userProfile:userProfile;


  constructor(
    private settingService: GlobalSettingsService
  ) {
    console.log('UserDataService works!')
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

  
}
