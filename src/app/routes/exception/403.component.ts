import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'exception-403',
  template: ` 403 pages works!`,
})
export class Exception403Component {
  constructor(modalSrv: NzModalService) {
    modalSrv.closeAll();
  }
}
