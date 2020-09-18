import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-user-train-exp-form-tpl',
  templateUrl: './user-train-exp-form-tpl.component.html',
  styleUrls: ['./user-train-exp-form-tpl.component.less']
})
export class UserTrainExpFormTplComponent implements OnInit {
  @Input() data: any;
  @Input() resume_id: number;

  validateForm!: FormGroup;

  loading: boolean = false;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    public globalService: GlobalSettingsService,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      trainContent: [null, [Validators.required]],
      trainOrganization: [null],
      trainRangeDate: [null, [Validators.required]]
    })

    if(this.data) {
      this.setForm();
    }
  }

  setForm() {
    // 设置表单值
    this.validateForm.patchValue({
      trainContent: this.data.description,
      trainOrganization: this.data.name,
      trainRangeDate: [this.data.start_time, this.data.end_time]
    })
  }


  submitForm():any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm, '简历 培训经历');
    if(this.validateForm.valid) {
      this.loading = true;
      const object: any = this.validateForm.value;

      const option = {
        name: object.trainOrganization,
        start_time: object.trainRangeDate[0],
        end_time: object.trainRangeDate[1],
        description: object.trainContent
      };

      console.log(option, 'project exp submit');

      this.loading = true;
      if (this.data) {
        this.edit(option);
      } else {
        this.create(option);
      }
    }

  }

  edit(option: any): void {
    this.globalService.patch(`/v1/web/user/resume_training/${this.data.id}`, option).subscribe((res: ApiData) => {
      this.loading = false;
      this.destroyModal({ data: res.data, type: 'edit' });
      this.msg.success('修改成功');

    }, err => this.loading = false)
  }
  create(option: any): void {
    this.globalService.post(`/v1/web/user/resume_training/${this.resume_id}`, option).subscribe((res: ApiData) => {
      this.loading = false;
      this.destroyModal({ data: res.data, type: 'create' });
      this.msg.success('新增成功');

    }, err => this.loading = false)
  }

  cancel(e: MouseEvent): void {
    e.preventDefault();
    this.destroyModal();
  }

  destroyModal(data:any = null): void {
    this.modal.destroy({ data: data });
  }
}
