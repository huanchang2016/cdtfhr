import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() sourceTarget?: string = ''; // 判断哪个模块调用当前组件
  @Input() isMenu?: boolean = true;
  @Input() isEntranceModal?: boolean = false;

  searchBoxVisible: boolean = false;

  constructor(
    private router: Router
  ) { }


  ngOnInit() {
    this.subscribeScoll$ = fromEvent(window, 'scroll')
      .subscribe((event) => {
        this.onWindowScroll();//调用
      });
  }

  toggleSearchInput() {
    this.searchBoxVisible = !this.searchBoxVisible;
  }

  searchOptionChange(option: any): void {
    let url: string = `/recruit/home?type=${option.type}&city_id=${option.city_id}`;
    if (option.keywords && option.keywords.trim()) {
      url = url + '&keywords=' + option.keywords.trim();
    }
    this.router.navigateByUrl(url);
  }

  subscribeScoll$: Subscription;
  scrollDis: any = {
    _top: 0
  }

  scollPostion() {
    let t: number, l: number, w: number, h: number;
    if (document.documentElement && document.documentElement.scrollTop) {
      t = document.documentElement.scrollTop;
      l = document.documentElement.scrollLeft;
      w = document.documentElement.scrollWidth;
      h = document.documentElement.scrollHeight;
    } else if (document.body) {
      t = document.body.scrollTop;
      l = document.body.scrollLeft;
      w = document.body.scrollWidth;
      h = document.body.scrollHeight;
    }
    return {
      top: t,
      left: l,
      width: w,
      height: h
    };
  }
  onWindowScroll() {
    this.scrollDis._top = this.scollPostion().top;

    if (this.scrollDis._top > 160) {
      this.searchBoxVisible = true;
    } else {
      this.searchBoxVisible = false;
    }
  }

  ngOnDestroy() {
    if (this.subscribeScoll$) {
      this.subscribeScoll$.unsubscribe();
    }
  }
}
