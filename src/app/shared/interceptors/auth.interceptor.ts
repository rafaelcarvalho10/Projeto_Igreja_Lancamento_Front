import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated() && req.url.indexOf('viacep') === -1) {
      let token = this.authService.getToken();
      const authReq: HttpRequest<any> = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(authReq)
        .pipe(catchError((error) => {
          console.log(error);
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.authService.logout();
              this.router.navigateByUrl('/login');
            }
          }

          return throwError(error);
        }))
    }
    return next.handle(req);
  }

}
