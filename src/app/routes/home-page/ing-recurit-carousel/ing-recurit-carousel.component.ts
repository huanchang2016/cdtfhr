import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-ing-recurit-carousel',
  templateUrl: './ing-recurit-carousel.component.html',
  styleUrls: ['./ing-recurit-carousel.component.less']
})
export class IngRecuritCarouselComponent implements OnInit {

  list: any[] = [];

  constructor(
    public settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {

    this.settingService.get(`/v1/web/index/now_job`).subscribe((res: ApiData) => {
      if (res.code === 200) {
        this.list = res.data;
      }
    })
  }
}
