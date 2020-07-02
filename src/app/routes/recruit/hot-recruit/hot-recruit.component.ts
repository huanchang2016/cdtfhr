import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hot-recruit',
  templateUrl: './hot-recruit.component.html',
  styleUrls: ['./hot-recruit.component.less']
})
export class HotRecruitComponent implements OnInit {

  list:any[] = []; // 数据列表
  loadingData:boolean = true;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadingData = false;
      this.list = [
        {
          id: 1,
          title: '石头科技2020年春季校园招聘',
          date_time: '2020-05-31 18:00',
          thumb: './assets/imgs/test/img_adv2.png',
          link: '/entrance'
        },
        {
          id: 2,
          title: '有灵魂 有本事 有血性 有品德',
          date_time: '2020-05-31 18:00',
          thumb: './assets/imgs/test/img_adv1.png',
          link: '/passport/register/company'
        },
        {
          id: 3,
          title: '石头科技2020年春季校园招聘',
          date_time: '2020-05-31 18:00',
          thumb: './assets/imgs/test/img_adv2.png',
          link: '/entrance'
        },
        {
          id: 4,
          title: '石头科技2020年春季校园招聘',
          date_time: '2020-05-31 18:00',
          thumb: './assets/imgs/test/img_adv2.png',
          link: '/entrance'
        },
        {
          id: 5,
          title: '有灵魂 有本事 有血性 有品德',
          date_time: '2020-05-31 18:00',
          thumb: './assets/imgs/test/img_adv1.png',
          link: '/passport/register/company'
        },
        {
          id: 6,
          title: '石头科技2020年春季校园招聘',
          date_time: '2020-05-31 18:00',
          thumb: './assets/imgs/test/img_adv2.png',
          link: '/entrance'
        }
      ];
    }, 800);
  }
}
