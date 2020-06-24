import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'exception-404',
  template: ` 404 pages works!`,
})
export class Exception404Component {
  constructor(modalSrv: NzModalService) {
    modalSrv.closeAll();
  }
}
