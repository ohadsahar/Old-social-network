import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../../../core/services/auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
              : boolean | Observable<boolean>| Promise<boolean> {
            const isAuth = this.authService.getIsLogged();
            if (!isAuth) {
              this.router.navigate(['/']);
            }
            return isAuth;
      }
    }
