import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router) { }

  isAuthenticated() : boolean {
    const items = sessionStorage.getItem("credentials");
    return items ? true : false
  }
  logout(){
    sessionStorage.removeItem("credentials");
    this.router.navigate(['/']);
  }
}
