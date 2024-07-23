import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  showLogoutButton : boolean = false;
  user : any = null;
  showList:boolean = false;

  constructor(private authSer : AuthService,private router : Router,private cdr: ChangeDetectorRef){}
  
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLogoutButton = event.url === '/tasks';
      }
    });
    this.authSer.getUserDetails().pipe(
      filter(data=>!!data)
    ).subscribe((data:any)=>{
      if(data){
        this.user = data;
        this.cdr.detectChanges();
      }
    })
  }
  
  logout(){
    this.authSer.logout();
  }
  
}
