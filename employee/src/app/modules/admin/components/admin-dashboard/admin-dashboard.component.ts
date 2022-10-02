import {Component, OnInit, ViewChild} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { startWith, tap } from 'rxjs/operators';
import { DatastorageService } from '../datastorage.service';



export interface PeriodicElement {
  username: string;
  ID: number;
  email: number;
  contact:string;
  password: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {ID: 1, username: 'Hydrogen', email: 1.0079, password: 'H' ,contact:"8447774123"},
  {ID: 2, username: 'Helium', email: 4.0026, password: 'He',contact:"8447774123"},
  {ID: 3, username: 'Lithium', email: 6.941, password: 'Li',contact:"8447774123"},
  {ID: 4, username: 'Beryllium', email: 9.0122, password: 'Be',contact:"8447774123"},
  {ID: 5, username: 'Boron', email: 10.811, password: 'B',contact:"8447774123"},
  {ID: 6, username: 'Carbon', email: 12.0107, password: 'C',contact:"8447774123"},
  {ID: 7, username: 'Nitrogen', email: 14.0067, password: 'N',contact:"8447774123"},
  {ID: 8, username: 'Oxygen', email: 15.9994, password: 'O',contact:"8447774123"},
  {ID: 9, username: 'Fluorine', email: 18.9984, password: 'F',contact:"8447774123"},
  {ID: 10, username: 'Neon', email: 20.1797, password: 'Ne',contact:"8447774123"},
  {ID: 11, username: 'Neon', email: 20.1797, password: 'Ne',contact:"8447774123"},
];

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'username', 'email', 'password','contact', 'action'];
  dataSource = new MatTableDataSource<any>();
 
 isLoading = true;
 
 pageNumber: number = 1;
   VOForm: FormGroup;
   isEditableNew: boolean = true;
   constructor(
     private fb: FormBuilder,
     private _formBuilder: FormBuilder ,public a :DatastorageService){}
 
   ngOnInit(): void {
     this.VOForm = this._formBuilder.group({
       VORows: this._formBuilder.array([])
     });
 
      this.VOForm = this.fb.group({
               VORows: this.fb.array(ELEMENT_DATA.map(val => this.fb.group({
                 ID: new FormControl(val.ID),
                 username: new FormControl(val.username),
                 email: new FormControl(val.email),
                 contact: new FormControl(val.contact),
                 password: new FormControl(val.password),
                 action: new FormControl('existingRecord'),
                 isEditable: new FormControl(true),
                 isNewRow: new FormControl(false),
               })
               )) //end of fb array
             }); // end of form group cretation
     this.isLoading = false;
     this.dataSource = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);
     this.dataSource.paginator = this.paginator;
 
     const filterPredicate = this.dataSource.filterPredicate;
       this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
         return filterPredicate.call(this.dataSource, data.value, filter);
       }
 
       //Custom filter according to username column
     // this.dataSource.filterPredicate = (data: {username: string}, filterValue: string) =>
     //   data.username.trim().toLowerCase().indexOf(filterValue) !== -1;
   }
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
 

   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
     this.paginatorList = document.getElementsByClassName('mat-paginator-range-label');
 
    this.onPaginateChange(this.paginator, this.paginatorList);
 
    this.paginator.page.subscribe(() => { // this is page change event
      this.onPaginateChange(this.paginator, this.paginatorList);
    });
   }
   
    applyFilter(event: Event) {
     //  debugger;
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
 
 
   // @ViewChild('table') table: MatTable<PeriodicElement>;
   AddNewRow() {
     // this.getBasicDetails();
     const control = this.VOForm.get('VORows') as FormArray;
     control.insert(0,this.initiateVOForm());
     this.dataSource = new MatTableDataSource(control.controls)
     // control.controls.unshift(this.initiateVOForm());
     // this.openPanel(panel);
       // this.table.renderRows();
       // this.dataSource.data = this.dataSource.data;
   }
 
   // this function will enabled the select field for editd
   EditSVO(VOFormElement:any, i:any) {
 
     // VOFormElement.get('VORows').at(i).get('username').disabled(false)
     VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
     // this.isEditableNew = true;
 
   }
 
   // On click of correct button in table (after click on edit) this method will call
   SaveVO(VOFormElement:any, i:any) {
    debugger
     // alert('SaveVO')
 
     VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
     this.a.data.push(this.VOForm.value.VORows);
     
   }
 
   // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
   CancelSVO(VOFormElement:any, i:any) {
     VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
   }
 
 
 paginatorList: HTMLCollectionOf<Element>;
 idx: number;
 onPaginateChange(paginator: MatPaginator, list: HTMLCollectionOf<Element>) {
      setTimeout((idx:any) => {
          let from = (paginator.pageSize * paginator.pageIndex) + 1;
 
          let to = (paginator.length < paginator.pageSize * (paginator.pageIndex + 1))
              ? paginator.length
              : paginator.pageSize * (paginator.pageIndex + 1);
 
          let toFrom = (paginator.length == 0) ? 0 : `${from} - ${to}`;
          let pageNumber = (paginator.length == 0) ? `0 of 0` : `${paginator.pageIndex + 1} of ${paginator.getNumberOfPages()}`;
          let rows = `Page ${pageNumber} (${toFrom} of ${paginator.length})`;
 
          if (list.length >= 1)
              list[0].innerHTML = rows; 
 
      }, 0, paginator.pageIndex);
 }
 
 
   initiateVOForm(): FormGroup {
    debugger
    let i = this.VOForm.value.VORows.length;
     return this.fb.group({
 
       ID: new FormControl(i),
                 username: new FormControl(''),
                 email: new FormControl(''),
                 password: new FormControl(''),
                 contact: new FormControl(''),
                 action: new FormControl('newRecord'),
                 isEditable: new FormControl(false),
                 isNewRow: new FormControl(true),
     });
   }
 
}