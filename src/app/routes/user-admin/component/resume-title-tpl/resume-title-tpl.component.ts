import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resume-title-tpl',
  templateUrl: './resume-title-tpl.component.html',
  styleUrls: ['./resume-title-tpl.component.less']
})
export class ResumeTitleTplComponent implements OnInit {
  @Input() data:any;

  validateForm!: FormGroup;

  loading:boolean = false;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      resume_title: [null, [Validators.required]]
    })

    if(this.data) {
      this.setForm();
    }
  }

  setForm() {
    // 设置表单值
    this.validateForm.patchValue({
      resume_title: null
    })
  }


  submitForm():any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm, '简历 证书信息');
    if(this.validateForm.valid) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.destroyModal(this.validateForm.value)
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
