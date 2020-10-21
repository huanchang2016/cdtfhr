import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-score-query-result',
  templateUrl: './score-query-result.component.html',
  styleUrls: ['./score-query-result.component.less']
})
export class ScoreQueryResultComponent implements OnInit {
  id: number;

  validateForm!: FormGroup;

  loading: boolean = false;
  result: any = null;

  captchaLoading:boolean = false;
  imgSrc:string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params) {
        this.id = +params['id'];
      }
    })
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      id_card: [null, [Validators.required]],
      captcha: [null, [Validators.required]]
    });

    this.changeCaptcha();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.search();
    }
  }

  search(): void {
    this.loading = true;
    this.result = null;
    setTimeout(() => {
      this.loading = false;
      this.result = {

      }
    }, 1500);
  }

  changeCaptcha():void {

    this.captchaLoading = true;
    this.imgSrc = '';
    setTimeout(() => {
      this.captchaLoading = false;
      this.imgSrc = './assets/imgs/logo_full_color.png';
    }, 800);
  }

}
