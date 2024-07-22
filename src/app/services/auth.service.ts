import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router) { }

  isAuthenticated() : boolean {
    const items = sessionStorage.getItem("task-item");
    return items ? true : false
  }
  logout(){
    sessionStorage.removeItem("task-item");
    this.router.navigateByUrl('/login');
  }
  getUserDetails(){
    const user = sessionStorage.getItem("task-item");
    return user ? JSON.parse(user) : null;
  }
}
