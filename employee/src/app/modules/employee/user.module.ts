import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/material-component.module';

import { UserRoutingModule } from './user-routing.module';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';


@NgModule({
  declarations: [EmployeeDashboardComponent],
  imports: [CommonModule,MaterialComponentsModule ,UserRoutingModule],
})
export class UserModule { }
