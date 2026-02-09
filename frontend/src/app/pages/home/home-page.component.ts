import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AuthScreenComponent } from './auth-screen/auth-screen.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [CommonModule, AuthScreenComponent, HomeScreenComponent], // Imports both screens
    templateUrl: './home-page.component.html'
})
export class HomePageComponent {
    authService = inject(AuthService);
}
