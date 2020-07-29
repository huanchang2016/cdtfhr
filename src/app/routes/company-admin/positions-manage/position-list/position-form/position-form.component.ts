import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.less']
})
export class PositionFormComponent implements OnInit {
  @Input() data:any;
  
  config:any = {
    nature: [
      { id: 1, name: '国有企业' },
      { id: 2, name: '民营企业、私企' },
      { id: 3, name: '政府机关、军队文职' },
      { id: 4, name: '其他外资、合资企业' }
    ],
    salary: [],
    education: [],
    work_exp: [],
    duration_time: []
  };

  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef
  ) { }

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      position_name: [{ value: null, disabled: this.data }, Validators.required ],
      test: [{ value: null, disabled: this.data }, Validators.required ],
      recruiters: [ null, Validators.required ],
      job_category: [{ value: null, disabled: this.data }, Validators.required ],
      cascader: [{ value: null, disabled: this.data }, Validators.required ],
      address: [{ value: null, disabled: this.data }, Validators.required ],
      nature: [{ value: null, disabled: this.data }, Validators.required ],
      salary: [null, Validators.required ],
      education: [null, Validators.required ],
      work_exp: [null, Validators.required ],
      description: [null, [Validators.required, Validators.maxLength(1000)] ],
      user_email: [null ],
      duration_time: [null, Validators.required ]
    });

    if(this.data) {
      this.setFormValue();
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm, 'steps2');
    if(this.validateForm.valid) {

    }
  }

  setFormValue():void {
    console.log('edit position form', this.data);
    this.validateForm.patchValue({
      recruiters: this.data.resumes_count,
      test: 'i am test component, test disabled controlValueAccess component!'
    });
  }

  cancel(e:Event):void {
    e.preventDefault();
    this.modal.destroy();
  }

}
