import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ApiData } from 'src/app/data/interface';
import { GlobalSettingsService } from '../global-settings/global-settings.service';
import { Router } from '@angular/router';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private httpClient: HttpClient,
    private injector: Injector,
    private settingService: GlobalSettingsService
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }
  
  private viaHttp(resolve: any, reject: any) {
    const tokenData:any = this.settingService.getToken();
    if (!tokenData) {
      resolve({});
      return;
    }
    this.httpClient.get('/v1/web/user/account').subscribe((res:ApiData) => {
      console.log(res, 'star_service accountinfo');
      this.settingService.user = res.data;
      
      resolve(res.data);

    }, err => {
      console.error('error account info get!', err);
      this.settingService.clearUser();
    })
    
  }
  
  load(): Promise<any> {
    console.log('startup service works!')
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      // this.viaMockI18n(resolve, reject);

    });
  }
}
