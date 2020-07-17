import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { ResumeViewRoutingModule } from './resume-view-routing.module';
import { ResumeViewComponent } from './resume-view.component';


@NgModule({
  declarations: [ResumeViewComponent],
  imports: [
    SharedModule,
    ResumeViewRoutingModule
  ]
})
export class ResumeViewModule { }
