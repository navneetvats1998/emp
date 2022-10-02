import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatastorageService {
data:any[] =[
  {ID: 1, username: 'Nishu', email: "Nishu@gmail.com", password: 'Hjsad' ,contact:"+918447774123" ,role:"employee"},
  {ID: 2, username: 'Shile', email: "Shilu@gmail.com", password: 'Hsade',contact:"+918447774123",role:"employee"},
  {ID: 3, username: 'Hatim', email: "Hatim@gmail.com", password: 'joker',contact:"+918447774123",role:"employee"},
  {ID: 4, username: 'Rockey', email: "Rockey@gmail.com", password: 'jack',contact:"+918447774123",role:"employee"},
  {ID: 5, username: 'Navneet', email: "Navneet@gmail.com", password: 'lossf',contact:"+918447774123",role:"employee"},
  {ID: 6, username: 'Priyank', email: "Priyank@gmail.com", password: 'paseer',contact:"+918447774123",role:"employee"},
  {ID: 7, username: 'Anita', email: "Anita@gmail.com", password: 'Nasnns',contact:"+918447774123",role:"employee"},
  {ID: 8, username: 'cypen', email: "cypen@gmail.com", password: 'paas',contact:"+918447774123",role:"employee"},
  {ID: 9, username: 'Aditya', email: "Aditya@gmail.com", password: 'lpaas',contact:"+918447774123",role:"employee"},
  {ID: 10, username: 'ajay', email: "ajay@gmail.com", password: 'pasr',contact:"+918447774123",role:"employee"},
];
  constructor() { }
  

}
export interface PeriodicElement {
  username: string;
  ID: number;
  email: string;
  contact:string;
  password: string;
  role:string;
}
