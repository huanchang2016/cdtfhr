import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyDataService } from '../service/company-data.service';

@Injectable({
  providedIn: 'root'
})
export class ComStatusCheckGuard implements CanActivate {
  constructor(
    private router: Router,
    private companyDataService: CompanyDataService
  ) { }
  
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const companyInfo = this.companyDataService.comanyInfo;
      if(companyInfo) {
        if(companyInfo.status === 0) {
          this.router.navigateByUrl('/admin/company/settings/organ');
          return false;
        }else {
          if(companyInfo.status === 2) {
            this.router.navigateByUrl('/passport/register/company?tab=1');
            return false; // 未填写资料，或者审核未通过时，需要重新填写资料
          }
          return companyInfo.status === 1;
        }
      }
  }
  
}
