import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-language-form-tpl',
  templateUrl: './user-language-form-tpl.component.html',
  styleUrls: ['./user-language-form-tpl.component.less']
})
export class UserLanguageFormTplComponent implements OnInit {
  @Input() data:any;

  validateForm!: FormGroup;

  loading:boolean = false;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      languageType: [null, [Validators.required]],
      languageWrite: [null, [Validators.required]],
      languageListen: [null, [Validators.required]]
    })

    if(this.data) {
      this.setForm();
    }
  }

  setForm() {
    // 设置表单值
    this.validateForm.patchValue({
      languageType: null,
      languageWrite: null,
      languageListen: null
    })
  }


  submitForm():any {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm, '简历 其它语言能力');
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
