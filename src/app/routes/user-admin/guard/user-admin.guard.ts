import { Injectable, Injector } from '@angular/core';
import { CanActivate, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalSettingsService } from '@core';

@Injectable({
  providedIn: 'root'
})
export class UserAdminGuard implements CanActivate {

  constructor(
    private injector: Injector
  ) { }

  private get settingService(): GlobalSettingsService {
    return this.injector.get(GlobalSettingsService);
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token: any = this.settingService.getToken();
    return token ? true : false;
  }

}
