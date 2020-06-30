import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.less']
})
export class Step1Component implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public transferSrv: TransferService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ['sfasdfa', [Validators.required]],
      password: ['a123456789a', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      agree: [null, Validators.required]
    });

    this.validateForm.patchValue(this.transferSrv.companyRegisterOption);
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm, 'steps1');
    if(this.validateForm.valid) {

      Object.assign(this.transferSrv.companyRegisterOption, this.validateForm.value);

      ++this.transferSrv.step;
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };


}
