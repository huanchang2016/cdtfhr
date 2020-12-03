import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CollectFileFormTplComponent } from './collect-file-form-tpl/collect-file-form-tpl.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collect-resume-list-c',
  templateUrl: './collect-resume-list-c.component.html',
  styleUrls: ['./collect-resume-list-c.component.less']
})
export class CollectResumeListCComponent implements OnInit {
  // @Input() colsChange: boolean;

  loadingData: boolean = true;

  listOfData: any[] = [];

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private msg: NzMessageService,
    private router: Router,
    private settingService: GlobalSettingsService
  ) {
    this.settingService.setTitle('收藏夹-简历库-天府菁英网');
  }

  ngOnInit(): void {
    this.getDataList();
  }
  getDataList(): void {
    this.loadingData = true;
    this.settingService.get('/v1/web/com/collect_tag').subscribe((res: ApiData) => {
      this.loadingData = false;
      const list: any[] = res.data;
      this.listOfData = list.sort((a: any, b: any) => b.default - a.default);
    }, err => this.loadingData = false)
  }

  editCollectFileName(data: any): void {
    this.createModal(data);
  }

  addCollectFile(): void {
    this.createModal();
  }
  createModal(data?: any): void {
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
    modal.afterClose.subscribe(result => {
      if (result) {
        this.getDataList();
      }
    });

  }

  navTo(id: number): void {
    this.router.navigateByUrl(`/admin/company/resumes/history/collect/${id ? id : 0}`);
  }

  deleted(id: number): void {
    this.settingService.delete(`/v1/web/com/collect_tag/${id}`).subscribe((res: ApiData) => {
      if (res.code === 200) {
        this.msg.success('删除成功');
        this.listOfData = this.listOfData.filter(v => v.id !== id);
        this.getDataList();
      }
    })
  }
  cancel(): void { }
}
