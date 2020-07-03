import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-celebrity-not-pass',
  templateUrl: './celebrity-not-pass.component.html',
  styleUrls: ['./celebrity-not-pass.component.less']
})
export class CelebrityNotPassComponent {

  constructor() { }

  ngOnInit(): void {
  }

  celebrity() {
    console.log('前往个人中心 进行实名认证');
  }

}
