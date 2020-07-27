import { Component, OnInit } from '@angular/core';
import { TransferService } from './transfer.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less'],
  providers: [TransferService]
})
export class CompanyRegisterComponent implements OnInit {

  constructor(
    public transferSrv: TransferService
  ) { }

  ngOnInit(): void {
  }



}
