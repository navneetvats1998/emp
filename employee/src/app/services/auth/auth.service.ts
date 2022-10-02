import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DatastorageService } from 'src/app/modules/admin/components/datastorage.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

   
  constructor(private router: Router, public storate:DatastorageService) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('index');
    this.router.navigate(['login']);
  }

  login({ email, password }: any): Observable<any> {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      this.setToken('abcdefghi');
      return of({ email: 'admin@gmail.com' , password: 'admin123',});
    }else{
       let a =this.storate.data;
       for(let i = 0 ;i <a.length ; i++){
        if(a[i].email ===email && a[i].password ===password ){
          this.setToken('abcdefghisadkankds');
       localStorage.setItem('index' ,i.toString());
          return of({ email: a[i].email  , password: a[i].password , role:a[i].role });
        }
       }
  
    }
    return throwError(new Error('Failed to login'));
  }


  Signup(form: []){
localStorage.getItem('data');
  }
}
