import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FooterComponent } from './components/footer/footer.component';
import { LucideAngularModule, Loader } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, LucideAngularModule],
  templateUrl: './app.html'
})
export class App implements OnInit {
  authService = inject(AuthService);
  protected readonly Loader = Loader;

  ngOnInit() {
    this.authService.authCheck().subscribe();
  }
}
