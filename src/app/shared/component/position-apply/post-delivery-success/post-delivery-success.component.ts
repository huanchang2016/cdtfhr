import { NzModalRef } from 'ng-zorro-antd/modal';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-delivery-success',
  templateUrl: './post-delivery-success.component.html',
  styleUrls: ['./post-delivery-success.component.less']
})
export class PostDeliverySuccessComponent {

  constructor(
    private router: Router,
    private modal: NzModalRef
  ) { }

  navTo():void {
    // [routerLink]="['']"
    this.modal.destroy();
    this.router.navigateByUrl('/admin/user/delivery/record');
  }

}
