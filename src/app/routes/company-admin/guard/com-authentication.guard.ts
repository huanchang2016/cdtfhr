import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyDataService } from '../service/company-data.service';

@Injectable({
  providedIn: 'root'
})
export class ComAuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private companyDataService: CompanyDataService
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /***
     * comanyInfo  根据 name字段判断是否已经完成单位资料填写，如未填写，跳转到 注册页面 stepIndex = 1，完善企业信息
     *             根据status = 0 | 1， 判断是否已经通过 管理员审核，如未通过，只能跳转到系统设置 ----> 认证信息页面
     * ***/
    const companyInfo = this.companyDataService.companyInfo;
    if (companyInfo) {
      if (companyInfo.status === 0) {
        return true;
      } else {
        if (!companyInfo.name || companyInfo.status === 2) {
          this.router.navigateByUrl('/passport/register/company');
          return false; // 未填写资料，或者审核未通过时，需要重新填写资料
        }
        return companyInfo.status === 1;
      }
    } else {
      return this.companyDataService.getProfile().then(data => {
        if (data.status === 0) {
          return true;
        } else {
          if (!data.name || data.status === 2) {
            this.router.navigateByUrl('/passport/register/company');
            return false; // 未填写资料，或者审核未通过时，需要重新填写资料
          }
          return data.status === 1;
        }
      })
    }
  }
}
