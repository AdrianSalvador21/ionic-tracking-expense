import { loggedInUserLocalStorageKey } from './../../modules/security/valid-users';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AppAuthGuardService implements CanActivate {

  public client = null;

  constructor(
    private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const loggedInUser = localStorage.getItem(loggedInUserLocalStorageKey);

      if (loggedInUser) {
        return true;
      }

      this.router.navigate(['/login']);

      return false;
    }

}
