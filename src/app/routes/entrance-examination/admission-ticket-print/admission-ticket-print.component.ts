import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-admission-ticket-print',
  templateUrl: './admission-ticket-print.component.html',
  styleUrls: ['./admission-ticket-print.component.less']
})
export class AdmissionTicketPrintComponent implements OnInit {
  id: number;

  validateForm!: FormGroup;

  loading: boolean = false;
  result: any = null;

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
      id_card: [null, [Validators.required]]
    });
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

  print(): void {
    console.log('print info');
    document.body.style.height = '800px';
    window.print();
    document.body.style.height = 'auto';
  }

  // downloadFile() {
  //   setTimeout(() => {
  //     const data: any = document.getElementById('print_wrapper');
  //     html2canvas(data).then(canvas => {
  //       console.log('canvas', canvas)
  //       const contentDataURL = canvas.toDataURL('image/png', 1.0)
  //       this.exportImage(contentDataURL);
  //     });
  //   }, 500);

  // }
  // exportImage(contentDataURL: any) {
  //   var base64Img = contentDataURL;
  //   let oA: any = document.createElement('a');
  //   oA.href = base64Img;
  //   oA.download = '准考证名称' + "_" + (new Date().getTime());
  //   var event = document.createEvent('MouseEvents');
  //   event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  //   oA.dispatchEvent(event);
  // }

}
