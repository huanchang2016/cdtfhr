import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel-index',
  templateUrl: './carousel-index.component.html',
  styleUrls: ['./carousel-index.component.less']
})
export class CarouselIndexComponent implements OnInit {
  array = [1, 2, 3, 4];
  list:any[] = [
    {
      id: 1,
      title: '菁英网 好平台 新机遇',
      sub_title: '提高收入，你值得更好的',
      thumb: './assets/imgs/test/img_banner.png',
      link: '/entrance'
    },
    {
      id: 2,
      title: '有灵魂 有本事 有血性 有品德',
      sub_title: '四有军人，热血报国',
      thumb: './assets/imgs/test/img_banner.png',
      link: '/passport/register/company'
    },
    {
      id: 3,
      title: '菁英网 好平台 新机遇',
      sub_title: '提高收入，你值得更好的',
      thumb: './assets/imgs/test/img_banner.png',
      link: '/entrance'
    }
  ];
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goTo(url: string):void {
    this.router.navigateByUrl(url);
  }

}
