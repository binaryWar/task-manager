import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   debugger
//   const authService = new AuthService();
//   const router = new Router();

//   if (authService.isAuthenticated()) {
//     router.navigate(['/incident']);
//     return true;
//   } else {
//     router.navigate(['/']);
//     return false;
//   }
// };

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      if(this.authService.isAuthenticated()){
        this.router.navigate(['/incident']);
      }else this.router.navigate(['/']); 
      return false;
    }
  }
}