import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, ChevronRight } from 'lucide-angular';

@Component({
    selector: 'app-auth-screen',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
    templateUrl: './auth-screen.component.html'
})
export class AuthScreenComponent {
    email = signal('');

    constructor(private router: Router) { }

    handleFormSubmit(event: Event) {
        event.preventDefault();
        this.router.navigate(['/signup'], { queryParams: { email: this.email() } });
    }
}
