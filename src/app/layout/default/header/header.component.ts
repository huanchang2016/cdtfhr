import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  searchToggleStatus: boolean;

  constructor( ) {}


}
