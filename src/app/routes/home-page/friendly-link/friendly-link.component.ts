import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-friendly-link',
  templateUrl: './friendly-link.component.html',
  styleUrls: ['./friendly-link.component.less']
})
export class FriendlyLinkComponent implements OnInit {

  links: any[] = [];

  constructor(
    public settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.settingService.get('/v1/web/index/link').subscribe((res: ApiData) => {
      if (res.code === 200) {
        this.links = res.data;
      }
    })
  }

  navTo(url: string): void {
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = 'http://' + url;
    }
    window.open(url);
  }
}
