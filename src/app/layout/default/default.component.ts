import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { GlobalSettingsService } from '@core';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-layout-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less']
})
export class LayoutDefaultComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  isVisible = false;

  /***  添加一个判断条件，判断当前路由是否在 entrance （招考模块）下面 isEntranceModal
   *    1. 如果当前路由地址在招考模块下，顶部显示招聘的菜单
   *    2. 如果当前路由地址不在招考模块下面，顶部菜单显示招考的菜单
   * ****/

  isEntranceModal: boolean = false;

  // 声明订阅对象
  rooterChange: Subscription;

  constructor(
    private settingService: GlobalSettingsService,
    private router: Router
  ) {
    /**
     * 监听路由变化
     */
    this.rooterChange = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (/^\/entrance/.test(event.url)) {
          this.isEntranceModal = true;
        }
      }
    });

    const url: string = location.pathname;
    const isIndex: boolean = (/^\/home/).test(url);


    // 获取当前用户访问页面时，是否有选择站点
    if (this.settingService.getItem('is_selected') || !isIndex) {
      this.close();
    } else {
      this.isVisible = true;
    }
  }

  ngOnInit(): void {
    document.querySelector('body').style.backgroundColor = "#FFFFFF";
  }


  showModal1(): void {
    this.isVisible = true;
  }

  toZp() {
    this.close();
    this.router.navigateByUrl('/');
  }

  toZk() {
    this.close();
    this.router.navigateByUrl('/entrance');
  }

  close() {
    this.isVisible = false;
    this.settingService.setItem('is_selected', true);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnDestroy() {
    if (this.rooterChange) {
      this.rooterChange.unsubscribe();
    }
    const { unsubscribe$ } = this;
    unsubscribe$.next();
    unsubscribe$.complete();

  }
}
