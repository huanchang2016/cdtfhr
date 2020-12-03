import { UserDataService } from './../../service/user-data.service';
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
  list: any[] = [];
  loadingData: boolean = true;

  openItemOption: { [key: number]: boolean } = {};
  defaultItemOption: { [key: number]: boolean } = {};

  constructor(
    private modal: NzModalService,
    private settingService: GlobalSettingsService,
    private userService: UserDataService,
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
    this.settingService.get('/v1/web/user/resumes').subscribe((res: ApiData) => {
      this.loadingData = false;
      this.list = res.data;

      if (this.list.length !== 0) {
        this.list.forEach(item => {
          this.openItemOption[item.id] = false;
          this.defaultItemOption[item.id] = false;
        });
      }
    }, err => this.loadingData = false)
  }

  isOpen: boolean = false;
  isDefault: boolean = false;

  openValueChange(data: any) {
    const option = {
      privacy: data.privacy ? 0 : 1
    };
    this.openItemOption[data.id] = true;
    this.settingService.post(`/v1/web/user/resume/privacy/${data.id}`, option).subscribe((res: ApiData) => {
      this.openItemOption[data.id] = false;
      if (res.code === 200) {
        this.msg.success(res.message);
        this.list = this.list.map(v => {
          if (v.id === res.data.id) {
            v.privacy = res.data.privacy;
          }
          return v;
        });
      } else {
        this.msg.error(res.message);
      }

    }, err => this.openItemOption[data.id] = false)
  }

  setDefault(data: any) {
    this.defaultItemOption[data.id] = true;
    this.settingService.post(`/v1/web/user/resume/set_default/${data.id}`).subscribe((res: ApiData) => {
      this.defaultItemOption[data.id] = false;
      if (res.code === 200) {
        this.msg.success(res.message);
        this.resetListDefault(data.id);
        this.userService.getProfile().then();
      } else {
        this.msg.error(res.message);
      }

    }, err => this.defaultItemOption[data.id] = false)
  }
  resetListDefault(id: number): void {
    this.list = this.list.map(v => {
      if (v.id === id) {
        v.is_default = true;
      } else {
        v.is_default = false;
      }
      return v;
    })
  }

  editResumeName(data: any) {
    this.createModal(data);
  }

  createModal(data: any = null): void {
    const modal = this.modal.create({
      nzTitle: '修改简历名称',
      nzContent: ResumeTitleTplComponent,
      nzMaskClosable: false,
      nzComponentParams: {
        data: data
      },
      nzFooter: null
    });
    modal.afterClose.subscribe(result => {
      if (result && result.data) {
        const data = result.data;
        this.updateList(data);
      }
    });
  }

  updateList(data: any): void {
    this.list = this.list.map(v => {
      if (v.id === data.id) {
        v = data
      }
      return v;
    });
  }

  isVisible: boolean = false;
  delData: any = null;
  showModal(data: any): void {
    this.delData = data;
    this.isVisible = true;
  }

  handleOk(): void {
    this.deleted();
  }

  deletedLoading: boolean = false;
  deleted() {
    this.deletedLoading = true;
    this.settingService.delete(`/v1/web/user/resume/${this.delData.id}`).subscribe((res: ApiData) => {
      this.deletedLoading = false;
      if (res.code === 200) {
        this.isVisible = false;
        this.list = this.list.filter(v => v.id !== this.delData.id);
        this.msg.success(res.message);
        this.handleCancel();
      } else {
        this.msg.error(res.message);
      }
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.delData = null;
  }


  cancel(): void { }
}
