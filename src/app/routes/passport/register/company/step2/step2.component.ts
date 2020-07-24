import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.less']
})
export class Step2Component implements OnInit {
  validateForm!: FormGroup;

  config:any = {
    nature: [],
    industry: []
  };

  constructor(
    private fb: FormBuilder,
    public transferSrv: TransferService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      companyname: [null, [Validators.required]],
      or_code: [null, Validators.required ],
      end_date: [null, Validators.required ],
      cascader: [null, Validators.required ],
      address: [null, Validators.required ],
      nature: [null, Validators.required ],

    });
    
    this.validateForm.patchValue(this.transferSrv.companyRegisterOption);
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm, 'steps2');
    if(this.validateForm.valid) {

      Object.assign(this.transferSrv.companyRegisterOption, this.validateForm.value);

      ++this.transferSrv.step;
    }
  }


  prev() {
    --this.transferSrv.step;
  }



}
