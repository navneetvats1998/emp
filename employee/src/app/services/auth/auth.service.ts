import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
   users : any[]=[
    { id: 1, name: 'Ram', email: 'ram@gmail.com', contact: '0000000000'  },
    { id: 2, name: 'Shyam', email: 'sh@gmail.com', contact: '1111111111'  },
    { id: 3, name: 'Mohan', email: 'moh@live.in', contact: '2222222222'  },
    { id: 4, name: 'Rohan', email: 'rohan@gmail.com', contact: '6666666666' },
    { id: 5, name: 'Sumit', email: 'sumit@live.in', contact: '9909999999'  }
  
  ];
  constructor(private router: Router) {}

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
    this.router.navigate(['login']);
  }

  login({ email, password }: any): Observable<any> {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      this.setToken('abcdefghi');
      return of({ name: 'Tarique Akhtar', email: 'admin@gmail.com' });
    }
    return throwError(new Error('Failed to login'));
  }


  Signup(form: []){
localStorage.getItem('data');
  console.log(this.users);
  // localStorage.setItem('data' , a);
  }
}
