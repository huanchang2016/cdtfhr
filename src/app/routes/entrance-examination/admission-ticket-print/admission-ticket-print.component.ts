import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalSettingsService } from '@core';
import { ApiData } from 'src/app/data/interface';

@Component({
  selector: 'app-admission-ticket-print',
  templateUrl: './admission-ticket-print.component.html',
  styleUrls: ['./admission-ticket-print.component.less']
})
export class AdmissionTicketPrintComponent implements OnInit {
  exam_id: number;

  validateForm!: FormGroup;

  loading: boolean = false;
  result: any = null;
  isEmpty:boolean = false;

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
      id_card: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      const opt = { id_number: this.validateForm.value.id_card };
      this.search(opt);
    }
  }

  search(opt:any): void {
    this.loading = true;
    this.result = null;
    this.isEmpty = false;

    this.settingService.post(`/v1/web/exam/exam_card/${this.exam_id}`, opt).subscribe((res:ApiData) => {
        this.loading = false;
        if(res.code === 200) {
          this.result = res.data;
          if(!this.result) {
            this.isEmpty = true;
          }
        }
      },
      err => this.loading = false
    );
    
  }

  print(): void {
    console.log('print info');
    document.body.style.height = '800px';
    window.print();
    document.body.style.height = 'auto';
  }
}
