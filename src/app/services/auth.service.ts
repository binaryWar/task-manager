import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router) { }
  private userDetails$ : Subject<any> = new Subject<any>();

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
  getUserDetails(){
    return this.userDetails$.asObservable();
  }
  setUserDetails(token:string){
    try {
      const decoded =  jwtDecode(token);
      this.userDetails$.next(decoded);
    } catch (Error) {
      console.log(Error);
    }
  }
}
