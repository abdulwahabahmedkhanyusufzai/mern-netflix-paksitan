import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // <--- IMPORT THIS
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor'; // <--- IMPORT YOUR INTERCEPTOR

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(), // Required for Toastr
    provideToastr(),     // Toastr Service
    
    // REGISTER THE INTERCEPTOR HERE
    provideHttpClient(withInterceptors([authInterceptor])) 
  ]
};