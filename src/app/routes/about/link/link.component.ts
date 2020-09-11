import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.less']
})
export class LinkComponent implements OnInit {

  constructor(
    private settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.settingService.setTitle('天府菁英网-联系我们');
  }
}
