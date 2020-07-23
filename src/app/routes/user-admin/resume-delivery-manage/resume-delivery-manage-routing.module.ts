import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryRecordListComponent } from './delivery-record-list/delivery-record-list.component';
import { DeliveryViewedListComponent } from './delivery-viewed-list/delivery-viewed-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'record', pathMatch: 'full' },
  { path: 'record', component: DeliveryRecordListComponent },
  { path: 'viewed', component: DeliveryViewedListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumeDeliveryManageRoutingModule { }
