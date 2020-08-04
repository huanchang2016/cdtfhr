import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from '../service/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private userDataService: UserDataService
  ) { }
  
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.userDataService.userProfile) {
      if(this.userDataService.userProfile.status !== 1) {
        this.router.navigateByUrl('/admin/user/certification');
      }
      return this.userDataService.userProfile.status === 1;
    }else {
      return this.userDataService.getProfile().then(data => {
        console.log('AuthenticationGuard get Data', data);
        if(data.status !== 1) {
          this.router.navigateByUrl('/admin/user/certification');
        }
        return data.status === 1;
      })
    }
  }
  
}
