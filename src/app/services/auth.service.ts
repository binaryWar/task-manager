import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router) { }

  isAuthenticated() : boolean {
    const items = sessionStorage.getItem("task-token");
    return items ? true : false
  }
  logout(){
    sessionStorage.removeItem("task-token");
    this.router.navigateByUrl('/login');
  }
  getToken(){
    const token = sessionStorage.getItem("task-token");
    return token ? JSON.parse(token) : null;
  }
  setToken(token:string){
    sessionStorage.setItem("task-token", JSON.stringify(token));  
  }
}
