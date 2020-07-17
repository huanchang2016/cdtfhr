import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-comment-form-tpl',
  templateUrl: './user-comment-form-tpl.component.html',
  styleUrls: ['./user-comment-form-tpl.component.less']
})
export class UserCommentFormTplComponent implements OnInit {
  @Input() data:any;

  validateForm!: FormGroup;

  loading:boolean = false;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      self_comment: [null]
    });

    if(this.data) {
      this.setForm();
    }
  }

  setForm() {
    // 设置表单值
    this.validateForm.patchValue({
      self_comment: null
    })
  }

  submitForm():any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm, '简历 个人信息');
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
