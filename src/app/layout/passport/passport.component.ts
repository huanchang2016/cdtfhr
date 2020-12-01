import { AfterViewInit, Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import 'jquery.ripples';


@Component({
  selector: 'layout-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less'],
})
export class LayoutPassportComponent implements OnInit, AfterViewInit {
  links = [
    {
      title: '帮助',
      href: '',
    },
    {
      title: '隐私',
      href: '',
    },
    {
      title: '条款',
      href: '',
    },
  ];


  ngAfterViewInit() {
    ($('#ripples_show_body') as any).ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.04
    });

  }

  ngOnInit(): void {
    document.querySelector('body').style.backgroundColor = "#FFFFFF";
  }

}
