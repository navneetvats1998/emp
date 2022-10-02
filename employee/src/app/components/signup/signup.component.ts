import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatastorageService } from 'src/app/modules/admin/components/datastorage.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
signUpForm!:FormGroup;
constructor( private auth :AuthService,private router: Router,public storage :DatastorageService
  ,private formBuilder: FormBuilder) {

  this.createValidationForm();

}

  ngOnInit(): void {
    // if (this.auth.isLoggedIn()) {
    //   this.router.navigate(['admin']);
    // }
  }
  createValidationForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['',Validators.email],
      password:['',Validators.required],
      role:['employee'],
      username:['',Validators.required],
      contact:['']
    })}

  onSubmit(): void {
    debugger
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value)
      console.log(this.storage.data);
      this.auth.Signup(this.signUpForm.value)
    
          this.router.navigate(['/login']);
   
  console.log( this.auth.storate
  
  )   
    }
  }
}
