import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';

@Component({
  selector: 'app-us',
  templateUrl: './us.component.html',
  styleUrls: ['./us.component.less']
})
export class UsComponent implements OnInit {
  constructor(
    private settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.settingService.setTitle('天府菁英网-关于我们-公司情况介绍');
  }

}
