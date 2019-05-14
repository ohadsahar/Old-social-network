import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('token');
    const authRequest = req.clone({headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    return next.handle(authRequest).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.status === 400) {
          this.authService.logout();
          return;
        }
        if (event.status === 401) {
          this.authService.logout();
          return;
        }
        if (event.status === 403) {
          this.authService.logout();
          return;
        }
      }
      return event;
    }));
  }}

