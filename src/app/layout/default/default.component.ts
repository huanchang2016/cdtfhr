import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { environment } from '@env/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-layout-default',
  templateUrl: './default.component.html',
})
export class LayoutDefaultComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  @ViewChild('settingHost', { read: ViewContainerRef, static: true })
  private settingHost: ViewContainerRef;
  isFetching = false;

  constructor(
    router: Router,
    msgSrv: NzMessageService,
    private resolver: ComponentFactoryResolver,
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: any,
  ) {
    // scroll to top in change page
    router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((evt) => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
      }
      if (evt instanceof NavigationError || evt instanceof NavigationCancel) {
        this.isFetching = false;
        if (evt instanceof NavigationError) {
          msgSrv.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
        }
        return;
      }
      if (!(evt instanceof NavigationEnd || evt instanceof RouteConfigLoadEnd)) {
        return;
      }
      if (this.isFetching) {
        setTimeout(() => {
          this.isFetching = false;
        }, 100);
      }
    });
  }
  ngAfterViewInit(): void {
    // Setting componet for only developer
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    const { unsubscribe$ } = this;
    unsubscribe$.next();
    unsubscribe$.complete();
  }
}
