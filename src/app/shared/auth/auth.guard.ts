import { AuthService } from './auth.service';


import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _authService: AuthService) { }

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean
    {
      if (this._authService.isAuthenticated())
        return true;

      this._router.navigate(['/login']);

      return false;
    }
}
