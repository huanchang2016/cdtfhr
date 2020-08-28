import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ActivatedRoute } from '@angular/router';
import { ApiData } from 'src/app/data/interface';
import { environment } from '@env/environment';
import { differenceInDays } from 'date-fns';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class CompanyIndexComponent implements OnInit {
  companyId:number;
  loading: boolean = true;

  info:any = null;
  environment = environment;

  constructor(
    public settingService: GlobalSettingsService,
    private activatedRoute: ActivatedRoute
    ) {
      this.activatedRoute.queryParams.subscribe(params => {
        if(params['cid']) {
          this.companyId = +params['cid'];
          this.getData();
        }
      });
    }

  ngOnInit(): void {
    
  }

  getData():void {
    this.loading = true;
    this.settingService.get(`/v1/web/com/get_info/${this.companyId}`).subscribe((res:ApiData) => {
      this.loading = false;
      console.log(res, 'company info works！');
      this.info = res.data.data;
    }, err => this.loading = false)
  }

  loginDate(login_date:string):string {

    const days:number = differenceInDays(new Date(), new Date(login_date));

    return days === 0 ? '今天' : `${days} 天前`;
  }

}
