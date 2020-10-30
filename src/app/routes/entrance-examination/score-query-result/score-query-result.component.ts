import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-score-query-result',
  templateUrl: './score-query-result.component.html',
  styleUrls: ['./score-query-result.component.less']
})
export class ScoreQueryResultComponent implements OnInit {
  exam_id: number;

  validateForm!: FormGroup;

  loading: boolean = false;
  result: any = null;

  captchaLoading:boolean = false;
  imgSrc:string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private settingService: GlobalSettingsService
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params) {
        this.exam_id = +params['id'];
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
      const value = this.validateForm.value;
      const opt = {
        id_number: value.id_card,
        name: value.username,
        captcha: value.captcha
      };
      this.search(opt);
    }
  }

  search(opt): void {
    this.loading = true;
    this.result = null;
    // setTimeout(() => {
    //   this.loading = false;
    //   this.result = {

    //   }
    // }, 1500);
    this.settingService.post(`/v1/web/exam/exam_score/${this.exam_id}`, opt).subscribe((res:ApiData) => {
        this.loading = false;
        console.log('result ', res)
        if(res.code === 200) {
          this.result = res.data;
        }
      },
      err => {
        this.loading = false;
        this.changeCaptcha();
      }
    );
  }

  changeCaptcha():void {
    this.captchaLoading = true;
    this.imgSrc = '';
    this.settingService.get(`/v1/web/exam/get_captcha`).subscribe((res:ApiData) => {
        console.log('captchaLoading ', res)
        this.captchaLoading = false;
        if(res.code === 200) {
          this.imgSrc = res.data.img;
        }
      },
      err => this.captchaLoading = false
    );
  }

}
