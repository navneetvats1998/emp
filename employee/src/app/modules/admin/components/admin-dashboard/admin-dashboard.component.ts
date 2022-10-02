import {Component, OnInit, ViewChild} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth/auth.service';

import { DatastorageService } from '../datastorage.service';



export interface PeriodicElement {
  username: string;
  ID: number;
  email: string;
  contact:string;
  password: string;
}



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent implements OnInit {
  edit:boolean = false;

  displayedColumns: string[] = ['ID', 'username', 'email', 'password','contact', 'action'];
  dataSource = new MatTableDataSource<any>();

 
 isLoading = true;
 
 pageNumber: number = 1;
   Form: FormGroup;
   isEditableNew: boolean = true;
   constructor(
     private fb: FormBuilder,
     private _formBuilder: FormBuilder ,public storage :DatastorageService , public auth:AuthService){}
 
   ngOnInit(): void {
    this.save();
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
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
 
 

/**
 * We're getting the FormArray from the FormGroup, inserting a new FormGroup into the FormArray, and
 * then setting the dataSource to the FormArray
 */
   AddNewRow() {
     const control = this.Form.get('FormRows') as FormArray;
     control.insert(0,this.initiateForm());
     this.dataSource = new MatTableDataSource(control.controls)
   }
 

/**
 * The function takes in the form element and the index of the row that is being edited. It then sets
 * the isEditable property of the row to false, which will hide the edit button and show the save
 * button
 * @param {any} FormElement - The form group that contains the form array.
 * @param {any} i - the index of the row in the FormArray
 */
   Edit(FormElement:any, i:any) {
     FormElement.get('FormRows').at(i).get('isEditable').patchValue(false);
     this.edit = true;
   }
 
   // On click of correct button in table (after click on edit) this method will call
   Save(FormElement:any, i:any) {
     if(!this.edit){
     FormElement.get('FormRows').at(i).get('isEditable').patchValue(true);
     this.storage.data.push(this.Form.value.FormRows[0]);
     this.save();
     }else{
      FormElement.get('FormRows').at(i-1).get('isEditable').patchValue(true);
      this.storage.data.push(this.Form.value.FormRows[i]);
     this.edit = false;
     }
   }
 
   // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
   Cancel(FormElement:any, i:any) {
     FormElement.get('FormRows').at(i).get('isEditable').patchValue(true);
     this.storage.data.splice(i,1);
     this.save();
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
 
 
   initiateForm(): FormGroup {
    
    let i = this.storage.data.length;
     return this.fb.group({
 
       ID: new FormControl(i+1),
                 username: new FormControl('',Validators.required),
                 email: new FormControl('',Validators.email),
                 password: new FormControl('',Validators.required),
                 contact: new FormControl('',Validators.compose([Validators.required,Validators.pattern(
                  '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'
                    )])),
                 role: new FormControl('employee'),
                 action: new FormControl('newRecord'),
                 isEditable: new FormControl(false),
                 isNewRow: new FormControl(true),
     });
   }

   save(){
    this.Form = this._formBuilder.group({
      FormRows: this._formBuilder.array([])
    });

     this.Form = this.fb.group({
              FormRows: this.fb.array(this.storage.data.map(val => this.fb.group({
                ID: new FormControl(val.ID),
                username: new FormControl(val.username ,Validators.required),
                email: new FormControl(val.email ,Validators.email),
                contact: new FormControl(val.contact ,Validators.compose([Validators.required,Validators.pattern(
                  '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'
                    )])),
                password: new FormControl(val.password , Validators.required),
                role: new FormControl(val.role),
                action: new FormControl('existingRecord'),
                isEditable: new FormControl(true),
                isNewRow: new FormControl(false),
              })
              )) 
            }); 
    this.isLoading = false;
    this.dataSource = new MatTableDataSource((this.Form.get('FormRows') as FormArray).controls);
    this.dataSource.paginator = this.paginator;

    const filterPredicate = this.dataSource.filterPredicate;
      this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
        return filterPredicate.call(this.dataSource, data.value, filter);
      }
    
   }
   deleteitem(FormElement:any, i:any){
    this.storage.data.splice(i,1);
    this.save();
   }

   logout(){
    this.auth.logout();
  }
 
}