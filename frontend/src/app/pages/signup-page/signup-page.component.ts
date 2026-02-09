import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signup-page',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './signup-page.component.html'
})
export class SignUpPageComponent implements OnInit {
    email = '';
    username = '';
    password = '';

    authService = inject(AuthService);
    route = inject(ActivatedRoute);

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['email']) {
                this.email = params['email'];
            }
        });
    }

    handleSignUp(event: Event) {
        event.preventDefault();
        this.authService.signup({ email: this.email, username: this.username, password: this.password }).subscribe();
    }
}
