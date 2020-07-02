import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-position-details',
  templateUrl: './position-details.component.html',
  styleUrls: ['./position-details.component.less']
})
export class PositionDetailsComponent implements OnInit {
  positionId:number = null;

  info:any = null;
  loadingData: boolean = true;

  applyLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private msg: NzMessageService
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.positionId = +params['id'];
      this.getData();
    });
  }

  ngOnInit(): void {
  }

  getData() {
    setTimeout(() => {
      this.loadingData = false;
      this.info = {id: 1, name: '张三', is_apply: false };
    }, 1000);
  }

  applyPosition() {
    console.log('申请职位， 岗位投递', this.positionId);

    this.applyLoading = true;
    setTimeout(() => {
      this.applyLoading = false;
      this.msg.success('职位投递成功');
      this.info['is_apply'] = true;
    }, 800);
  }
}
