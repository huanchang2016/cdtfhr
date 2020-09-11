import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ResumeTitleTplComponent } from '../../component/resume-title-tpl/resume-title-tpl.component';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';
import { isTemplateRef } from 'ng-zorro-antd/core/util';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.less']
})
export class ResumeListComponent implements OnInit {
  list:any[] = [];
  loadingData: boolean = true;

  openItemOption: {[key:number]: boolean} = {};
  defaultItemOption: {[key:number]: boolean} = {};

  constructor(
    private modal: NzModalService,
    private settingService: GlobalSettingsService,
    private msg: NzMessageService
  ) {
    this.settingService.setTitle('我的简历-简历管理-天府菁英网');
  }

  ngOnInit(): void {
    this.getDataList();
  }

  getDataList() {
    this.loadingData = true;
    this.openItemOption = {};
    this.settingService.get('/v1/web/user/resumes').subscribe((res:ApiData) => {
      this.loadingData = false;
      console.log(res)
      this.list = res.data;
      
      if(this.list.length !== 0) {
        this.list.forEach(item => {
          this.openItemOption[item.id] = false;
          this.defaultItemOption[item.id] = false;
        });
      }
    }, err => this.loadingData = false)
  }

  isOpen:boolean = false;
  isDefault:boolean = false;

  openValueChange(data:any) {
    console.log(data, 'data', 'open your resume');
    const option = {
      privacy: data.privacy ? 0 : 1
    };
    this.openItemOption[data.id] = true;
    this.settingService.post(`/v1/web/user/resume/privacy/${data.id}`, option).subscribe((res:ApiData) => {
      this.openItemOption[data.id] = false;
      this.msg.success(res.message);
      // this.updateList(res.data);
      this.list = this.list.map( v => {
        if(v.id === res.data.id) {
          v.privacy = res.data.privacy;
        }
        return v;
      });
    }, err => this.openItemOption[data.id] = false)
  }

  setDefault(data:any) {
    console.log(data, 'data', 'set default resume');
    this.defaultItemOption[data.id] = true;
    this.settingService.post(`/v1/web/user/resume/set_default/${data.id}`).subscribe((res:ApiData) => {
      this.defaultItemOption[data.id] = false;
      this.msg.success(res.message);
      this.resetListDefault(data.id);
    }, err => this.defaultItemOption[data.id] = false)
  }
  resetListDefault(id:number):void {
    this.list = this.list.map( v => {
      if(v.id === id) {
        v.is_default = true;
      }else {
        v.is_default = false;
      }
      return v;
    })
    // .sort((a, b) => b.is_default - a.is_default)
  }

  editResumeName(data:any) {
    console.log('修改简历名称', data);
    this.createModal(data);
  }

  createModal(data:any = null):void {
    const modal = this.modal.create({
      nzTitle: '修改简历名称',
      nzContent: ResumeTitleTplComponent,
      // nzViewContainerRef: this.viewContainerRef,
      // nzWidth: '800px',
      // nzBodyStyle: {
      //   padding: '24px 100px 30px'
      // },
      nzMaskClosable: false,
      // nzGetContainer: () => document.body,
      nzComponentParams: {
        data: data
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: null
    });
    // const instance = modal.getContentComponent();
    // modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log('[afterClose] The result is:', result)
      if(result && result.data) {
        const data = result.data;
        this.updateList(data);
      }
    });
  }

  updateList(data:any):void {
    this.list = this.list.map( v => {
      if(v.id === data.id) {
        v = data
      }
      return v;
    });
  }

  deleted(data:any) {
    console.log('deleted data', data);
    this.settingService.delete(`/v1/web/user/resume/${data.id}`).subscribe((res:ApiData) => {
      this.list = this.list.filter(v => v.id !== data.id);
      this.msg.success(res.message);
    });
  }

  cancel():void {}
}
