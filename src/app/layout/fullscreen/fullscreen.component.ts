import { Component } from '@angular/core';

@Component({
  selector: 'layout-fullscreen',
  templateUrl: './fullscreen.component.html'
})
export class LayoutFullScreenComponent {
  
  constructor() {
    document.querySelector('body').style.backgroundColor = "#FFFFFF";
  }
}
