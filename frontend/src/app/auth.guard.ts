import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { map, take } from 'rxjs'; // AuthService authCheck returns observable, but user signal is available

export const canActivateAuth: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // If user is logged in, allow access to protected routes
    if (authService.user()) {
        return true;
    } else {
        // If not logged in, redirect to login
        return router.createUrlTree(['/login']);
    }
};

export const canActivatePublic: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // If user is logged in, redirect to home (away from login/signup)
    if (authService.user()) {
        return router.createUrlTree(['/']);
    } else {
        return true;
    }
};
