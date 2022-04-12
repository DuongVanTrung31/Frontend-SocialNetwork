import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserToken} from "../models/dto/user-token";
import {AuthenticationService} from "../services/authentication.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  currentUser ?: UserToken;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe(
      currentUser => {
        this.currentUser = currentUser;
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser) {
      return true;
    } else {
      this.router.navigate(["/login"]).then();
      return false;
    }
  }
}
