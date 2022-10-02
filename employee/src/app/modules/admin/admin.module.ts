import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

import { MaterialComponentsModule } from 'src/app/material-component.module';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [CommonModule, AdminRoutingModule ,MaterialComponentsModule],
})
export class AdminModule {}
