import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';

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
    // const tokenData = this.tokenService.get();
    // if (!tokenData.token) {
    //   this.injector.get(Router).navigateByUrl('/passport/login');
    //   resolve({});
    //   return;
    // }
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
    // // Application information: including site name, description, year
    // this.settingService.setApp(app);
    // // User information: including name, avatar, email address
    // this.settingService.setUser(user);
    // // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
    // this.aclService.setFull(true);
    // // Menu data, https://ng-alain.com/theme/menu
    // this.menuService.add([
    //   {
    //     text: 'Main',
    //     group: true,
    //     children: [
    //       {
    //         text: 'Dashboard',
    //         link: '/dashboard',
    //         icon: { type: 'icon', value: 'appstore' }
    //       },
    //       {
    //         text: 'Quick Menu',
    //         icon: { type: 'icon', value: 'rocket' },
    //         shortcutRoot: true
    //       }
    //     ]
    //   }
    // ]);
    // // Can be set page suffix title, https://ng-alain.com/theme/title
    // this.titleService.suffix = app.name;

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
