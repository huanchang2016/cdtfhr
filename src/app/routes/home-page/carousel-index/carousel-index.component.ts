import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-carousel-index',
  templateUrl: './carousel-index.component.html',
  styleUrls: ['./carousel-index.component.less']
})
export class CarouselIndexComponent implements OnInit {

  list: any[] = [];

  constructor(
    private router: Router,
    public settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.settingService.get('/v1/web/index/rotation').subscribe((res: ApiData) => {
      if (res.code === 200) {
        this.list = res.data;
      }
    })
  }

  navTo(url: string): void {
    window.open(url);
  }

  goTo(url: string): void {
    this.router.navigateByUrl(url);
  }

}
