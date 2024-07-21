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

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private commonService : CommonService,private loaderService : LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let loggedInUserId = this.commonService.getLoggedInUserId();
    this.loaderService.show();
    if (!loggedInUserId) {
      const items = sessionStorage.getItem("credentials");
      if (items) {
        loggedInUserId = JSON.parse(items).id;
      }
    }

    if (loggedInUserId) {
      const modifiedReq = request.clone({
        setHeaders: {
          'userId' : `${loggedInUserId}`
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
