import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GoogleAuthService } from './services/google-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'incident-management';
  showLogoutButton : boolean = false;
  constructor(private authSer : AuthService,private router : Router,private GoogleAuth : GoogleAuthService){}
  
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLogoutButton = event.url === '/tasks';
      }
    });
  }
  
  logout(){
    this.authSer.logout();
  }
  logoutFromGoogle(){
    debugger
    this.GoogleAuth.logout();
  }
}
