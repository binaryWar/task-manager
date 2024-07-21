import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'incident-management';
  showLogoutButton : boolean = false;
  constructor(private authSer : AuthService,private router : Router){}
  
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLogoutButton = event.url !== '/';
      }
    });
  }
  
  logout(){
    this.authSer.logout();
  }
  
}
