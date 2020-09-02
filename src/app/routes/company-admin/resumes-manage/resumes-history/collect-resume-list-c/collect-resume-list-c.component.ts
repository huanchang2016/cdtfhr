import { Component, OnInit, Input, OnChanges, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CollectFileFormTplComponent } from './collect-file-form-tpl/collect-file-form-tpl.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-collect-resume-list-c',
  templateUrl: './collect-resume-list-c.component.html',
  styleUrls: ['./collect-resume-list-c.component.less']
})
export class CollectResumeListCComponent implements OnChanges, OnInit {
  // @Input() colsChange: boolean;

  loadingData: boolean = true;

  listOfData: any[] = [];

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    public msg: NzMessageService,
    public settingService: GlobalSettingsService
  ) { }

  ngOnChanges() {
    console.log('onchanges ');

    // if (this.listOfData.length !== 0) {
      // console.log('cols changes', this.colsChange);
    // }
  }

  ngOnInit(): void {
    console.log('collect list c');
    this.getDataList();
  }
  getDataList(): void {
    this.loadingData = true;
    this.settingService.get('/v1/web/com/collect_tag').subscribe((res:ApiData) => {
      console.log('简历库 收藏夹 文件夹', res);
      this.loadingData = false;
      this.listOfData = res.data;
    }, err => this.loadingData = false)
    // setTimeout(() => {
    //   this.loadingData = false;

    //   this.listOfData = [1, 2, 3, 4, 5, 6, 7, 8]
    // }, 1000);
  }

  editCollectFileName(data:any):void {
    this.createModal(data);
  }

  addCollectFile():void {
    this.createModal();
  }
  createModal(data?:any):void {
    const modal = this.modal.create({
      nzTitle: '提示',
      nzContent: CollectFileFormTplComponent,
      nzMaskClosable: false,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        data: data
      },
      nzFooter: null
    });
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('[afterClose 新建/编辑 简历库 收藏夹] The result is:', result)
      if(result) {
        this.getDataList();
      }
    });

  }

  deleted(id:number):void {
    this.settingService.delete(`/v1/web/com/collect_tag/${id}`).subscribe((res:ApiData) => {
      if(res.code === 200) {
        this.msg.success('删除成功');
        this.listOfData = this.listOfData.filter( v => v.id !== id);
      }
    })
  }
  cancel():void {}
}
