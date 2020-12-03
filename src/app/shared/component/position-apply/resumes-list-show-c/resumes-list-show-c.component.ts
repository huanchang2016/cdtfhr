import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';
import { UserDataService } from 'src/app/routes/user-admin/service/user-data.service';
import { CelebrityNotPassComponent } from '../celebrity-not-pass/celebrity-not-pass.component';

@Component({
  selector: 'app-resumes-list-show-c',
  templateUrl: './resumes-list-show-c.component.html',
  styleUrls: ['./resumes-list-show-c.component.less']
})
export class ResumesListShowCComponent implements OnInit {
  @Input() positionId?: number;
  @Input() ids?: number[];

  validateForm!: FormGroup;
  loadingData: boolean = true;
  loading: boolean = false;

  resumes: any[] = [];

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private modalSrv: NzModalService,
    public globalService: GlobalSettingsService,
    private msg: NzMessageService,
    private userDataService: UserDataService
  ) {
    this.loadingData = true;
    this.globalService.get('/v1/web/user/resumes').subscribe((res: ApiData) => {
      this.loadingData = false;
      if (res.code === 200) {
        this.resumes = res.data;
      }
    }, err => this.loadingData = false)
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      resume_id: [null, [Validators.required]]
    });
  }

  submitForm(): any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.loading = true;
      const object: any = this.validateForm.value;
      let option: any = {
        resume_id: object.resume_id
      };
      let url: string = '';
      if (this.ids && this.ids.length !== 0) {
        // 表示批量投递
        option['ids'] = this.ids;
        url = '/v1/web/user/create_lot_delivery';
      } else {
        option['job_id'] = this.positionId;
        url = '/v1/web/user/create_delivery';
      }

      this.globalService.post(url, option).subscribe((res: ApiData) => {
        this.loading = false
        if (res.code === 200) {
          // 刷新简历投递记录
          this.userDataService.getProfile().then();
          this.destroyModal({ type: 'success' });
        } else if (res.code === 999) { // 未通过实名认证
          this.celebrityNotPass();
        } else {
          this.msg.warning(res.message);
        }
      }, err => this.loading = false)
    }
  }

  userCelebrityModal: any = null;
  // 未通过实名认证
  celebrityNotPass() {
    this.userCelebrityModal = this.modalSrv.create({
      nzTitle: null,
      nzContent: CelebrityNotPassComponent,
      nzMaskClosable: false,
      nzWidth: 455,
      nzStyle: { top: '250px' },

      nzFooter: null
    });
    this.userCelebrityModal.afterClose.subscribe(result => {
      if (result && result.type === 'success') {
      }
    });
  }

  cancel(e: MouseEvent): void {
    e.preventDefault();
    this.destroyModal();
  }

  destroyModal(data?: any): void {
    this.modal.destroy(data);
  }
}
