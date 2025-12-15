import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,CommonModule],
  standalone:true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontendForSigningIn');

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  get currentUser$() {
    return this.authService.currentUser;
  }

  logout() {
  this.authService.signout().subscribe({
    next: () => {
      this.router.navigate(['/']);
    },
    error: err => console.error(err)
  });
}
}
