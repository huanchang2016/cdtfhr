import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'exception-404',
  template: `
    <div id="wrap">
      <div>
        <img src="./assets/imgs/exception/404.png" alt="404" />
      </div>
      <div id="text">
        <strong>
          <span></span>
          <a [routerLink]="['/']">返回首页</a>
          <a href="javascript:history.back()">返回上一页</a>
        </strong>
      </div>
    </div>

    <div class="animate below"></div>
    <div class="animate above"></div>`,
  styleUrls:[ `./css/404.less`]
})
export class Exception404Component implements OnInit {
  constructor(modalSrv: NzModalService) {
    modalSrv.closeAll();
  }

  ngOnInit() {
    document.body.style.backgroundColor = '#67ace4';
    document.body.style.overflow = 'hidden';
  }
}
