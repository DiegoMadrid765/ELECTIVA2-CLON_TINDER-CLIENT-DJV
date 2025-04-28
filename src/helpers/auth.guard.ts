import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthUserService } from '../app/services/auth-user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthUserService

    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        if (!localStorage.getItem("token")) {
            this.router.navigate(['/dashboard/login']);
        }

        if (this.authService.validateToken() == false) {
            this.router.navigate(['/dashboard/login']);
        }

        return true;
    }
}