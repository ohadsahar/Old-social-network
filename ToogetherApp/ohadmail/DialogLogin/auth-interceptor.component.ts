import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('token');
    const authRequest = req.clone({headers: req.headers.set('Authorization', `Ohad ${authToken}`)
    });
    return next.handle(authRequest);
  }

}
