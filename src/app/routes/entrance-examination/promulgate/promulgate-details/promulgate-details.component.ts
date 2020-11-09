import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-promulgate-details',
  templateUrl: './promulgate-details.component.html',
  styleUrls: ['./promulgate-details.component.less']
})
export class PromulgateDetailsComponent implements OnInit {
  
  dataInfo:any = null;
  loading:boolean = true;

  newsId:number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private settingService: GlobalSettingsService
  ) {
    this.activatedRoute.params.subscribe((params:Params) => {
      if(params) {
        this.newsId = +params['id'];
        this.getData();
      }
    })
  }

  ngOnInit(): void {
    
  }

  getData():void {
    this.loading = true;
    this.settingService.get(`/v1/web/exam/announce/${this.newsId}`).subscribe((res:ApiData) => {
      this.loading = false;
      if(res.code === 200) {
        this.dataInfo = res.data;
      }else {
        this.dataInfo = null;
      }
    })
  }

}
