import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  
  // 1. Get Token
  const token = localStorage.getItem('token');

  // 2. Clone Request (Angular requests are immutable, so we clone to add headers)
  let authReq = req;
  
  // Add Base URL if not already present (Simulating Axios baseURL)
  if (!req.url.startsWith('http')) {
    authReq = req.clone({ 
      url: `${environment.apiBaseUrl}${req.url}` 
    });
  }

  // Add Authorization Header
  if (token) {
    authReq = authReq.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  // 3. Handle Request & Errors
  return next(authReq).pipe(
    // Simulate Axios Timeout (10 seconds)
    timeout(10000), 
    
    // Handle Errors
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred. Please try again.';

      if (error.status === 401 || error.status === 403) {
        // Handle Unauthorized
        localStorage.removeItem('token');
        router.navigate(['/login']);
        errorMessage = 'Session expired. Please login again.';
      } else if (error.error?.message) {
        // Use server error message if available
        errorMessage = error.error.message;
      }

      // Show Toast Notification
      toastr.error(errorMessage, 'Error');

      // Propagate error to the component
      return throwError(() => error);
    })
  );
};