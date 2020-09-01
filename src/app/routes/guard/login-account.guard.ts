import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class LoginAccountGuard implements CanActivate {
  constructor(
    private router: Router,
    private msg: NzMessageService,
    private settingService: GlobalSettingsService
  ) { }
  
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /***  实现需求： 网站所有页面信息除了首页/登录注册页面，其余页面均需要登录后才可以访问
     *    1. 判断当前是否为登录状态
     *       
     *       方法： a. 判断存储中时否有token   b. 全局中间件中 user 是否为空
     * ***/

    if(this.settingService.user || this.settingService.getToken()) {
      return true;
    }else {
      // this.router.navigateByUrl('/passport/register/company?tab=1');
      this.msg.warning('您需要登录后才可以查看该页面内容');
      return false;
    }
  }
  
}
