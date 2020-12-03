import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-interview-message-view-tpl',
  templateUrl: './interview-message-view-tpl.component.html',
  styleUrls: ['./interview-message-view-tpl.component.less']
})
export class InterviewMessageViewTplComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {

  }

}
