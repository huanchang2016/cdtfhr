import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { SubAccountFormCComponent } from './sub-account-form-c/sub-account-form-c.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-sub-account-settings',
  templateUrl: './sub-account-settings.component.html',
  styleUrls: ['./sub-account-settings.component.less']
})
export class SubAccountSettingsComponent implements OnInit {
  listOfData: any[] = [];
  loading: boolean = true;

  defaultItemOption: {[key:number]: boolean} = {};
  powerOption: {[key:number]: boolean} = {};

  tplModal?: NzModalRef;

  constructor(
    private modal: NzModalService,
    private msg: NzMessageService,
    private settingService: GlobalSettingsService
  ) {
    this.settingService.setTitle('子账号管理-账号管理-天府菁英网');
  }

  ngOnInit(): void {

    this.getDataList();
  }

  getDataList(): void {
    this.loading = true;
    this.settingService.get('/v1/web/com/account').subscribe((res:ApiData) => {
      this.loading = false;
      console.log(res, '获取子账号列表数据');
      this.listOfData = res.data;
      if(this.listOfData.length !== 0) {
        this.listOfData.forEach(item => {
          this.defaultItemOption[item.id] = false;
          this.powerOption[item.id] = false;
        });
      }
    }, err => this.loading = false);
  }

  setDefaultStatus(data:any):void {
    this.defaultItemOption[data.id] = true;

    this.settingService.post(`/v1/web/com/account/status/${data.id}`).subscribe((res:ApiData) => {
      this.defaultItemOption[data.id] = false;
      let msg: string = '';
      if(data.status === 1) {
        msg = '冻结成功';
      }else {
        msg = '激活成功';
      }
      this.msg.success(msg);
      // this.resetListDefault(res.data);
      this.listOfData = this.listOfData.map( v => {
        if(v.id === res.data.id) {
          v.status = res.data.status;
        }
        return v;
      })
    }, err => this.defaultItemOption[data.id] = false)
  }

  setPowerAuth(data:any):void {
    this.powerOption[data.id] = true;

    this.settingService.post(`/v1/web/com/account/job_power/${data.id}`).subscribe((res:ApiData) => {
      this.powerOption[data.id] = false;
      this.msg.success('操作成功');
      // this.resetListDefault(res.data);
      this.listOfData = this.listOfData.map( v => {
        if(v.id === res.data.id) {
          v.job_power = res.data.job_power;
        }
        return v;
      })
    }, err => this.powerOption[data.id] = false)
  }

  resetListDefault(data:any):void {
    this.listOfData = this.listOfData.map( v => {
      if(v.id === data.id) {
        v = data;
      }
      return v;
    })
  }

  edit(data: any): void {
    this.createModal(data);
  }

  add(): void {
    this.createModal();
  }

  createModal(data:any = null):void {
    this.tplModal = this.modal.create({
      nzTitle: (data ? '编辑' : '新建') + '子账号',
      nzContent: SubAccountFormCComponent,
      nzWidth: '800px',
      nzBodyStyle: {
        padding: '24px 100px 30px'
      },
      nzMaskClosable: false,
      nzComponentParams: {
        data: data
      },
      nzFooter: null
    });

    // const instance = modal.getContentComponent();
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    this.tplModal.afterClose.subscribe(result => {
      console.log('[afterClose] The result is:', result)
      if(result && result.type === 'success') {
        this.getDataList();
      }
    });
  }

  deleted(data: any): void {

  }

  cancel(): void { }

}
