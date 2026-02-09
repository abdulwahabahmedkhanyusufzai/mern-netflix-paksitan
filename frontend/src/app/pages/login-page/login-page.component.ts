import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
    email = '';
    password = '';

    authService = inject(AuthService);

    handleLogin(event: Event) {
        event.preventDefault();
        this.authService.login({ email: this.email, password: this.password }).subscribe();
    }
}
