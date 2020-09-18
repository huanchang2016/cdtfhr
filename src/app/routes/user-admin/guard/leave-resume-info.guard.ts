import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ResumeCreateComponent } from './../resume-manage/resume-create/resume-create.component';

@Injectable({
  providedIn: 'root'
})
export class LeaveResumeInfoGuard implements CanDeactivate<ResumeCreateComponent> {

  canDeactivate(component: ResumeCreateComponent,
                  route: ActivatedRouteSnapshot,
                  state: RouterStateSnapshot): Observable<boolean> | boolean {
        // return component.leaveTip();
        return false;
  }
  
}
