import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyDataService } from '../service/company-data.service';

@Injectable({
  providedIn: 'root'
})
export class PositionManageGuard implements CanActivate {
  constructor(
    private router: Router,
    private companyDataService: CompanyDataService
  ) { }
  
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const companyInfo = this.companyDataService.companyInfo;
      if(companyInfo) {
        if(!companyInfo.job_power) {
          this.router.navigateByUrl('/admin/company/resumes/search');
          return false;
        }
        return companyInfo.job_power;
      }
  }
}
