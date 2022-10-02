import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDashboardComponent,
    children: [
      // { path: 'home', component: HomeComponent },
      // { path: 'about', component: AboutComponent },
      // { path: 'services', component: ServicesComponent },
      // { path: 'contact', component: ContactComponent },
      { path: '', redirectTo: '/employee-dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
