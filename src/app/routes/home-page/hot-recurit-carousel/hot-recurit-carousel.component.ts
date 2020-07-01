import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hot-recurit-carousel',
  templateUrl: './hot-recurit-carousel.component.html',
  styleUrls: ['./hot-recurit-carousel.component.less']
})
export class HotRecuritCarouselComponent implements OnInit {

  list:any[] = [
    [
      {
        id: 1,
        title: '菁英网 好平台 新机遇',
        sub_title: '提高收入，你值得更好的',
        thumb: './assets/imgs/test/img_adv2.png',
        link: '/entrance'
      },
      {
        id: 2,
        title: '有灵魂 有本事 有血性 有品德',
        sub_title: '四有军人，热血报国',
        thumb: './assets/imgs/test/img_adv1.png',
        link: '/passport/register/company'
      },
      {
        id: 3,
        title: '菁英网 好平台 新机遇',
        sub_title: '提高收入，你值得更好的',
        thumb: './assets/imgs/test/img_adv2.png',
        link: '/entrance'
      },
      {
        id: 4,
        title: '菁英网 好平台 新机遇',
        sub_title: '提高收入，你值得更好的',
        thumb: './assets/imgs/test/img_adv2.png',
        link: '/entrance'
      },
      {
        id: 5,
        title: '有灵魂 有本事 有血性 有品德',
        sub_title: '四有军人，热血报国',
        thumb: './assets/imgs/test/img_adv1.png',
        link: '/passport/register/company'
      },
      {
        id: 6,
        title: '菁英网 好平台 新机遇',
        sub_title: '提高收入，你值得更好的',
        thumb: './assets/imgs/test/img_adv2.png',
        link: '/entrance'
      }
    ],
    [
      {
        id: 1,
        title: '菁英网 好平台 新机遇',
        sub_title: '提高收入，你值得更好的',
        thumb: './assets/imgs/test/img_adv.png',
        link: '/entrance'
      },
      {
        id: 2,
        title: '有灵魂 有本事 有血性 有品德',
        sub_title: '四有军人，热血报国',
        thumb: './assets/imgs/test/img_adv1.png',
        link: '/passport/register/company'
      },
      {
        id: 3,
        title: '菁英网 好平台 新机遇',
        sub_title: '提高收入，你值得更好的',
        thumb: './assets/imgs/test/img_adv2.png',
        link: '/entrance'
      },
      {
        id: 4,
        title: '菁英网 好平台 新机遇',
        sub_title: '提高收入，你值得更好的',
        thumb: './assets/imgs/test/img_adv2.png',
        link: '/entrance'
      },
      {
        id: 5,
        title: '有灵魂 有本事 有血性 有品德',
        sub_title: '四有军人，热血报国',
        thumb: './assets/imgs/test/img_adv1.png',
        link: '/passport/register/company'
      },
      {
        id: 6,
        title: '菁英网 好平台 新机遇',
        sub_title: '提高收入，你值得更好的',
        thumb: './assets/imgs/test/img_adv1.png',
        link: '/entrance'
      }
    ]
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
