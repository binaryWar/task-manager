import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CommonService } from './common.service';
import { LoaderService } from './loader.service';
import { AuthService } from './auth.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService,private loaderService : LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show();
    
    const user = this.authService.getUserDetails();

    if (user) {
      const {id} = user;
      const modifiedReq = request.clone({
        setHeaders: {
          'userId' : `${id}`
        },
      });
      return next.handle(modifiedReq).pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
              this.loaderService.hide();
            }
          },
          error => {
            if (error instanceof HttpErrorResponse) {
              this.loaderService.hide();
            }
          }
        )
      );
    }
    else return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this.loaderService.hide();
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            this.loaderService.hide();
          }
        }
      )
    );
  }
}
