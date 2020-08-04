import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalSettingsService } from '@core';
import { UserDataService } from '../service/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserAdminHomeGuard implements CanActivate {
  constructor(
    private settingService: GlobalSettingsService,
    private router: Router,
    private userDataService: UserDataService
  ) { }
  
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.userDataService.userProfile) {
      if(this.userDataService.userProfile.status !== 1) {
        this.router.navigateByUrl('/admin/user/certification');
        return false;
      }else if(this.userDataService.userProfile.complete !== 1) {
        this.router.navigateByUrl('/admin/user/resumes');
        return false;
      }else {
        return true;
      }
    }else {
      return this.userDataService.getProfile().then(data => {
        if(data.status !== 1) {
          this.router.navigateByUrl('/admin/user/certification');
          return false;
        }else if(data.complete !== 1) {
          this.router.navigateByUrl('/admin/user/resumes');
          return false;
        }else {
          return true;
        }
      })
    }

    

  }
  
}
