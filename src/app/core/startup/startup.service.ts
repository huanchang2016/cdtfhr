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
    const tokenData: any = this.settingService.getToken();
    if (!tokenData) {
      resolve({});
      return;
    }
    this.httpClient.get('/v1/web/user/account').subscribe((res: ApiData) => {
      this.settingService.user = res.data;

      resolve(res.data);

    }, err => {
      this.settingService.clearUser();
    })
  }

  load(): Promise<any> {
    // only works with promises
    return new Promise((resolve, reject) => {
      // http
      this.viaHttp(resolve, reject);
    });
  }
}
