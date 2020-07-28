import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-manage',
  templateUrl: './account-manage.component.html',
  styleUrls: ['./account-manage.component.less']
})
export class AccountManageComponent implements OnInit, OnDestroy {
  private router$: Subscription;

  tabs: any[] = [
    {
      key: 'info',
      tab: '账号信息'
    },
    {
      key: 'link',
      tab: '联系人信息'
    },
    {
      key: 'change-password',
      tab: '密码修改'
    },
    {
      key: 'sub-account',
      tab: '子账号设置'
    }
  ];

  pos = 0;

  constructor(private router: Router) {}

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    const idx = this.tabs.findIndex(w => w.key === key);
    if (idx !== -1) {
      this.pos = idx;
    }
  }

  ngOnInit(): void {
    this.router$ = this.router.events.pipe(filter(e => e instanceof ActivationEnd)).subscribe(() => this.setActive());
    this.setActive();
  }

  to(item: any) {
    this.router.navigateByUrl(`/admin/company/settings/account/${item.key}`);
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }
}
