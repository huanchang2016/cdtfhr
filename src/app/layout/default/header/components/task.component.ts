import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-header-task',
  template: `
    ddd
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderTaskComponent {
  loading = true;

  constructor(private cdr: ChangeDetectorRef) {}

  change() {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 500);
  }
}
