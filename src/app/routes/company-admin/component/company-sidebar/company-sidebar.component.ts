import { Component, OnInit } from '@angular/core';
import { CompanyDataService } from '../../service/company-data.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-company-sidebar',
  templateUrl: './company-sidebar.component.html',
  styleUrls: ['./company-sidebar.component.less']
})
export class CompanySidebarComponent implements OnInit {
  environment = environment;

  constructor(
    public companyDataService: CompanyDataService
  ) { }

  ngOnInit(): void {
    
    if(!this.companyDataService.companyInfo) {
      this.companyDataService.getProfile().then();
    }
  }
}
