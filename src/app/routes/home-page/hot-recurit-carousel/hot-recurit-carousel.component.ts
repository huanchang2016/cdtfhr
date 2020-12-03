import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-hot-recurit-carousel',
  templateUrl: './hot-recurit-carousel.component.html',
  styleUrls: ['./hot-recurit-carousel.component.less']
})
export class HotRecuritCarouselComponent implements OnInit {

  list: any[] = [];

  constructor(
    public settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {

    this.settingService.get(`/v1/web/index/hot_job`).subscribe((res: ApiData) => {
      if (res.code === 200) {
        this.list = res.data;
      }
    })
  }

  navTo(url: string): void {
    url = url || '/';
    window.open(url);
  }

}
