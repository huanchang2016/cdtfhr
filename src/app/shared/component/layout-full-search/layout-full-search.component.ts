import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { List } from 'src/app/data/interface';
import { GlobalSettingsService } from '@core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-full-search',
  templateUrl: './layout-full-search.component.html',
  styleUrls: ['./layout-full-search.component.less']
})
export class LayoutFullSearchComponent implements OnInit {

  @Output() searchOptionChange:EventEmitter<any> = new EventEmitter();


  type:string = 'position';
  keywords:string = '';
  city_id: number = -1;
  cities:List[] = [];

  constructor(
    private router: Router,
    private settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.getCities();
  }

  search():void {
    console.log('fullscreen search c works: ', this.type, this.keywords, this.city_id);
    // /recruit/home
    // this.router.navigateByUrl(`/recruit/home?type=${this.type}&keywords=${this.keywords}&city_id=${this.city_id}`);
    this.searchOptionChange.emit({
      type: this.type,
      keywords: this.keywords,
      city_id: this.city_id
    })
  }

  getCities():void {
    // 获取城市列表
    
  }

}
