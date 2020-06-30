import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntranceExaminationRoutingModule } from './entrance-examination-routing.module';
import { EntranceHomeComponent } from './home/home.component';
import { SharedModule } from '@shared';

const ROUTESCOMPONENTS = [
  EntranceHomeComponent
];

@NgModule({
  declarations: [
    ...ROUTESCOMPONENTS
  ],
  imports: [
    SharedModule,
    EntranceExaminationRoutingModule
  ]
})
export class EntranceExaminationModule { }
