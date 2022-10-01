import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
signUpForm!:FormGroup;
constructor( private auth :AuthService,private router: Router,
  private formBuilder: FormBuilder) {

  this.createValidationForm();

}

  ngOnInit(): void {
    // if (this.auth.isLoggedIn()) {
    //   this.router.navigate(['admin']);
    // }
  }
  createValidationForm() {
    this.signUpForm = this.formBuilder.group({
      email: [''],
      password:[''],
      role:['employee'],
      username:[''],
      contact:['']
    })}

  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value)
      this.auth.Signup(this.signUpForm.value)
    
          this.router.navigate(['/login']);
    debugger
  console.log( localStorage.getItem('data')
  
  )   
    }
  }
}
