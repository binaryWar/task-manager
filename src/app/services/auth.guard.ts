import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const path = route.url[0].path;
  const authService : AuthService = inject(AuthService);
  const router : Router  = inject(Router);  
  const flag = authService.isAuthenticated();
  
  switch (path) {
    case 'login':
    case 'signup':
      if (flag) {
        router.navigateByUrl('/tasks');
      }
      return true;
    default:
      if (flag) {
        return true;
      } else {
        router.navigateByUrl('/login');
        return false;
      }
  }
};
