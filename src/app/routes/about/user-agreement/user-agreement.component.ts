import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';

@Component({
  selector: 'app-user-agreement',
  templateUrl: './user-agreement.component.html',
  styleUrls: ['./user-agreement.component.less']
})
export class UserAgreementComponent implements OnInit {
  constructor(
    private settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.settingService.setTitle('天府菁英网-用户服务协议');
  }
}
