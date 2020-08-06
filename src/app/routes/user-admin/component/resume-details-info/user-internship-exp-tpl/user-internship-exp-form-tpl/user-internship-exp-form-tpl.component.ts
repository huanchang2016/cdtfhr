import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GlobalSettingsService } from '@core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-user-internship-exp-form-tpl',
  templateUrl: './user-internship-exp-form-tpl.component.html',
  styleUrls: ['./user-internship-exp-form-tpl.component.less']
})
export class UserInternshipExpFormTplComponent implements OnInit {
  @Input() data: any;
  @Input() resume_id: number;

  validateForm!: FormGroup;

  loading:boolean = false;
  
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    public globalService: GlobalSettingsService,
    private msg: NzMessageService
  ) { }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      company_name: [null, [Validators.required]],
        company_industry: [null, [Validators.required]],
        company_scale: [null, [Validators.required]],
        company_nature: [null, [Validators.required]],
        position_name: [null, [Validators.required]],
        work_range_date: [null, [Validators.required]],
        range_salary: [null, [Validators.required]],
        work_description: [null, [Validators.required]]
    })

    if(this.data) {
      this.setForm();
    }
  }

  setForm() {
    // 设置表单值
    console.log(this.data, 'setForm');
    this.validateForm.patchValue({
      company_name: this.data.name,
      company_industry: this.data.industry.id,
      company_scale: this.data.scale.id,
      company_nature: this.data.type.id,
      position_name: this.data.position,
      work_range_date: [this.data.start_time, this.data.end_time],
      range_salary: this.data.salary.id,
      work_description: this.data.description
    })
  }


  submitForm():any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm, '简历 实习经历');
    if(this.validateForm.valid) {
      this.loading = true;
      const object: any = this.validateForm.value;

      const option = {
        name: object.company_name,
        industry_id: object.company_industry,
        company_scale_id: object.company_scale,
        company_type_id: object.company_nature,
        position_name: object.position_name,
        start_time: object.work_range_date[0],
        end_time: object.work_range_date[1],
        salary: object.range_salary,
        description: object.work_description
      };

      console.log(option, 'work exp submit')

      this.loading = true;
      if (this.data) {
        this.edit(option);
      } else {
        this.create(option);
      }
    }
  }

  edit(option: any): void {
    this.globalService.patch(`/v1/web/user/resume_practice/${this.data.id}`, option).subscribe((res: ApiData) => {
      this.loading = false;
      this.destroyModal({ data: res.data, type: 'edit' });
      this.msg.success('修改成功');

    }, err => this.loading = false)
  }
  create(option: any): void {
    this.globalService.post(`/v1/web/user/resume_practice/${this.resume_id}`, option).subscribe((res: ApiData) => {
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
