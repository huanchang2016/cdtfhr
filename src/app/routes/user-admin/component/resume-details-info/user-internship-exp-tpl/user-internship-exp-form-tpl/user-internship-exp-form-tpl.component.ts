import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-internship-exp-form-tpl',
  templateUrl: './user-internship-exp-form-tpl.component.html',
  styleUrls: ['./user-internship-exp-form-tpl.component.less']
})
export class UserInternshipExpFormTplComponent implements OnInit {
  @Input() data:any;

  validateForm!: FormGroup;

  loading:boolean = false;
  
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder
  ) {}


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
    this.validateForm.patchValue({
      company_name: null,
      company_industry: null,
      company_scale: null,
      company_nature: null,
      position_name: null,
      work_range_date: null,
      range_salary: null,
      work_description: null
    })
  }


  submitForm():any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm, '简历 工作经历');
    if(this.validateForm.valid) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.destroyModal({ id: 1, name: '张三' })
      }, 800);
    }
    
  }

  cancel(e: MouseEvent): void {
    e.preventDefault();
    this.destroyModal();
  }

  destroyModal(data:any = null): void {
    this.modal.destroy({ data: data });
  }
}
