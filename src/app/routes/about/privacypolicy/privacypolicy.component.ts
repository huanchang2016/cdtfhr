import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.less']
})
export class PrivacypolicyComponent implements OnInit {
  constructor(
    private settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.settingService.setTitle('天府菁英网-隐私政策');
  }

}
