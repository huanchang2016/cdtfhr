import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';

@Component({
  selector: 'app-company-agreement',
  templateUrl: './company-agreement.component.html',
  styleUrls: ['./company-agreement.component.less']
})
export class CompanyAgreementComponent implements OnInit {
  constructor(
    private settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.settingService.setTitle('天府菁英网-用户服务协议');
  }
}
