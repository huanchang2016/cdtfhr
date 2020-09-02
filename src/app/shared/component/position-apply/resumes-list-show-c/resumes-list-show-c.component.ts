import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-resumes-list-show-c',
  templateUrl: './resumes-list-show-c.component.html',
  styleUrls: ['./resumes-list-show-c.component.less']
})
export class ResumesListShowCComponent implements OnInit {
  @Input() positionId?:number;
  @Input() ids?:number[];

  validateForm!: FormGroup;
  loadingData:boolean = true;
  loading:boolean = false;
  
  resumes:any[] = [];

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    public globalService: GlobalSettingsService,
    private msg: NzMessageService
  ) {
    this.loadingData = true;
    this.globalService.get('/v1/web/user/resumes').subscribe((res:ApiData) => {
      this.loadingData = false;
      if(res.code ===200) {
        this.resumes = res.data;
      }
    }, err => this.loadingData = false)
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      resume_id: [null, [Validators.required]]
    });

  }

  submitForm():any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm, '简历投递');
    if(this.validateForm.valid) {
      this.loading = true;
      const object: any = this.validateForm.value;
      let option:any = {
        resume_id: object.resume_id
      };
      let url:string = '';
      if(this.ids && this.ids.length !== 0) {
        // 表示批量投递
        option['ids'] = this.ids;
        url = '/v1/web/user/create_lot_delivery';
      }else {
        option['job_id'] = this.positionId;
        url = '/v1/web/user/create_delivery';
      }

      this.globalService.post(url, option).subscribe((res:ApiData) => {
        this.loading = false
        if(res.code === 200) {
          // this.msg.success('投递成功');
          this.destroyModal({type: 'success' });
        }else {
          this.msg.warning(res.message);
        }
      }, err => this.loading = false)

    }

  }

  cancel(e: MouseEvent): void {
    e.preventDefault();
    this.destroyModal();
  }

  destroyModal(data?:any):void {
    this.modal.destroy(data);
  }
}
