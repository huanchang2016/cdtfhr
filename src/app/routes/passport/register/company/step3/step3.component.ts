import { Component, OnInit, Input } from '@angular/core';
import { TransferService } from '../transfer.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.less']
})
export class Step3Component implements OnInit {
  @Input() companyInfo:any;

  environment = environment;

  constructor(
    public transferSrv: TransferService
  ) {}

  ngOnInit(): void {
    if(this.companyInfo && this.companyInfo.status === 1) {
      this.transferSrv.step = 3;
    }
  }
}
