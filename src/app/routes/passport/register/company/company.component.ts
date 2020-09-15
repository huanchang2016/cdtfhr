import { Component, OnInit } from '@angular/core';
import { TransferService } from './transfer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyDataService } from 'src/app/routes/company-admin/service/company-data.service';
import { GlobalSettingsService } from '@core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less'],
  providers: [TransferService]
})
export class CompanyRegisterComponent implements OnInit {

  companyInfo:any = null;

  constructor(
    // private activatedRoute: ActivatedRoute,
    private router: Router,
    private companyDataService: CompanyDataService,
    private settingService: GlobalSettingsService,
    public transferSrv: TransferService
  ) {
    
     // tab
    //  this.activatedRoute.queryParams.subscribe(params => {
    //   if(params['tab']) {
    //     this.getDataInfo();
    //   }
    // });
  }

  ngOnInit(): void {
    if(this.settingService.getToken()) {
      this.getDataInfo();
    }else {
      this.transferSrv.step = 0;
    }
  }

  getDataInfo():void {
    
    if(this.companyDataService.companyInfo && this.companyDataService.companyInfo.name) {
      this.companyInfo = this.companyDataService.companyInfo;
      if(this.companyInfo.status === 0) {
        this.transferSrv.step = 2;
      }if(this.companyInfo.status === 1) {
        this.router.navigateByUrl('/admin/company');
      }else {
        this.transferSrv.step = 1;
      }
    }else {
      this.companyDataService.getProfile().then(data => {
        if(data) {
          this.companyInfoChange(data);
        }else {
          this.transferSrv.step = 1;
        }
      })
    }
  }

  companyInfoChange(data:any):void {
    if(data) {
      this.companyInfo = {...data};
      if(this.companyInfo.status === 0) {
        this.transferSrv.step = 2;
      }else if(data.status === 1) {
        this.router.navigateByUrl('/admin/company');
      }else {
        this.transferSrv.step = 1;
      }
    }
  }


}
