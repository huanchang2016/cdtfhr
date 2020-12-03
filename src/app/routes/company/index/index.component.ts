import { Component, OnInit } from '@angular/core';
import { GlobalSettingsService } from '@core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiData } from 'src/app/data/interface';
import { environment } from '@env/environment';
import { differenceInDays } from 'date-fns';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class CompanyIndexComponent implements OnInit {
  companyId: number;
  loading: boolean = true;

  info: any = null;
  environment = environment;

  constructor(
    public settingService: GlobalSettingsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['cid']) {
        this.companyId = +params['cid'];
        this.getData();
      }
    });
  }

  ngOnInit(): void {

  }

  searchOptionChange(option: any): void {
    let url: string = `/recruit/home?type=${option.type}&city_id=${option.city_id}`;
    if (option.keywords && option.keywords.trim()) {
      url = url + '&keywords=' + option.keywords.trim();
    }
    this.router.navigateByUrl(url);
  }

  getData(): void {
    this.loading = true;
    this.settingService.get(`/v1/web/com/get_info/${this.companyId}`).subscribe((res: ApiData) => {
      this.loading = false;
      this.info = res.data.data;
      this.settingService.setTitle(`${this.info.name}-公司主页-天府菁英网`)
    }, err => this.loading = false)
  }

  loginDate(login_date: string): string {

    const days: number = differenceInDays(new Date(), new Date(login_date));

    return days === 0 ? '今天' : `${days} 天前`;
  }

}
