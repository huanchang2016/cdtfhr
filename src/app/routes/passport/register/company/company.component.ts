import { Component, OnInit } from '@angular/core';
import { TransferService } from './transfer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyDataService } from 'src/app/routes/company-admin/service/company-data.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less'],
  providers: [TransferService]
})
export class CompanyRegisterComponent implements OnInit {

  companyInfo:any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private companyDataService: CompanyDataService,
    public transferSrv: TransferService
  ) {
    
     // tab
     this.activatedRoute.queryParams.subscribe(params => {
      if(params['tab']) {
        this.getDataInfo();
      }
    });
  }

  ngOnInit(): void {
  }

  getDataInfo():void {

    if(this.companyDataService.companyInfo) {
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
          this.companyInfo = {...data};
          if(this.companyInfo.status === 0) {
            this.transferSrv.step = 2;
          }if(this.companyInfo.status === 1) {
            this.router.navigateByUrl('/admin/company');
          }else {
            this.transferSrv.step = 1;
          }
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
      }else {
        this.transferSrv.step = 1;
      }
    }
  }


}
