import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'exception-500',
  template: ` 500 pages works!`,
})
export class Exception500Component {
  constructor(modalSrv: NzModalService) {
    modalSrv.closeAll();
  }
}
