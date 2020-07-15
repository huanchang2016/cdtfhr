import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-layout-default',
  templateUrl: './default.component.html',
  styles: [`
    .alain-default__content {
      min-height: 400px;
    }
  `]
})
export class LayoutDefaultComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  constructor() {
    
  }
  
  ngOnInit(): void {
    document.querySelector('body').style.backgroundColor = "#FFFFFF";
  }

  ngOnDestroy() {
    const { unsubscribe$ } = this;
    unsubscribe$.next();
    unsubscribe$.complete();
  }
}
