import { Component ,OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DatastorageService } from 'src/app/modules/admin/components/datastorage.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'username', 'email', 'password','contact'];
  dataSource = new MatTableDataSource<any>();

  constructor(public storage:DatastorageService , public auth:AuthService) { }

  ngOnInit(): void {
    this.b();
  }
b(){  
  debugger
  let i  = localStorage.getItem('index');
  
 let indesx =  this.storage.data[+i]
 let arr :any[] = [];
  arr.push(indesx);
  this.dataSource = new MatTableDataSource<any>(arr);
}

logout(){
  this.auth.logout();
}

}


