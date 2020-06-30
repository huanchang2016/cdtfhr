import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { Router } from '@angular/router';
import { ApiData } from 'src/app/data/interface';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private httpClient: HttpClient,
    private injector: Injector
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }
  
  private viaMockI18n(resolve: any, reject: any) {
    // this.httpClient
    //   .get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`)
    //   .subscribe(langData => {
    //     this.translate.setTranslation(this.i18n.defaultLang, langData);
    //     this.translate.setDefaultLang(this.i18n.defaultLang);

    //     this.viaMock(resolve, reject);
    //   });
    this.viaMock(resolve, reject);
  }
  
  private viaMock(resolve: any, reject: any) {
    const tokenData:any = JSON.parse(localStorage.getItem('cdtfhr_user'));
    if (!tokenData) {
      resolve({});
      return;
    }
    this.httpClient.get('/v1/web/user/profile').subscribe((res:ApiData) => {
      if(res.code === 200) {

      }
      
     
    })
     // mock
    const app: any = {
      name: `天府菁英网`,
      description: `汇聚天下英才  共创千秋伟业`
    };
    const user: any = {
      name: '天府人资',
      avatar: './assets/tmp/img/avatar.jpg',
      email: 'cdtfhr@admin.com',
      token: '028-80518071'
    };
    console.log([app, user])

    resolve({});
  }

  load(): Promise<any> {
    console.log('startup service works!')
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      // this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      this.viaMockI18n(resolve, reject);

    });
  }
}
