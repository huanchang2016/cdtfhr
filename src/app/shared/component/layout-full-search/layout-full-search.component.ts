import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { List } from 'src/app/data/interface';
import { GlobalSettingsService } from '@core';

@Component({
  selector: 'app-layout-full-search',
  templateUrl: './layout-full-search.component.html',
  styleUrls: ['./layout-full-search.component.less']
})
export class LayoutFullSearchComponent implements OnInit {

  @Input() Option?:any;
  @Output() searchOptionChange:EventEmitter<any> = new EventEmitter();


  type:string = 'position';
  keywords:string = '';
  city_id: number;
  cities:List[] = [];

  constructor(
    public settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    if(this.settingService.hotCities.length !== 0) {
      this.defaultCityValue();
    }else {
      this.settingService.getHotCities().then( _ => this.defaultCityValue());
    }

    if(this.Option) {
      this.type = this.Option.type;
      this.keywords = this.Option.keywords;
      this.city_id = this.Option.city_id ? +this.Option.city_id : -1 ;
    }
  }
  
  defaultCityValue():void {
    this.cities = this.settingService.hotCities;
    if(!this.Option || !this.Option.city_id) {
      this.city_id = this.cities.length !== 0 ? this.cities[0].id : null;
    }
  }

  search():void {
    this.searchOptionChange.emit({
      type: this.type,
      keywords: this.keywords,
      city_id: this.city_id
    })
  }

}
