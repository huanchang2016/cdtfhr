import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passport-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.less'],
})
export class UserLockComponent {
  f: FormGroup;

  constructor(
    fb: FormBuilder,
    private router: Router,
  ) {
    this.f = fb.group({
      password: [null, Validators.required],
    });
  }

  submit() {
    // tslint:disable-next-line:forin
    for (const i in this.f.controls) {
      this.f.controls[i].markAsDirty();
      this.f.controls[i].updateValueAndValidity();
    }
    if (this.f.valid) {
      console.log('Valid!');
      console.log(this.f.value);
      // 暂存 token
      // this.tokenService.set({
      //   token: '123',
      // });
      this.router.navigate(['dashboard']);
    }
  }
}
