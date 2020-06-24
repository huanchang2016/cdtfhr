import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-exception-trigger',
  template: `
    <div class="pt-lg">
      <nz-card>
        <button *ngFor="let t of types" (click)="go(t)" nz-button nzType="danger">触发{{ t }}</button>
      </nz-card>
    </div>
  `,
})
export class ExceptionTriggerComponent {
  types = [401, 403, 404, 500];

  constructor(private http: HttpClient) {}

  go(type: number) {
    this.http.get(`/api/${type}`).subscribe();
  }
}
