import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/Authentication/auth-service';
import { filter, map, Observable, startWith, switchMap, timer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {

  @Output() passwordUpdated = new EventEmitter<void>();
  error$!: Observable<string | null>;

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  ngOnInit() {
    this.auth.clearError();
    this.error$ = this.auth.error$.pipe(
      filter(Boolean),
      switchMap(error =>
        timer(3000).pipe(
          map(() => null),
          startWith(error)
        )
      )
    );
  }

  form = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
  });

  change() {
    this.auth.changePassword(this.form.value as any).subscribe({
      next: () => {
      
        this.auth.setPasswordExpired(false);
        this.passwordUpdated.emit();
       
        this.auth.signout().subscribe({
          next: () => {
        
            this.router.navigate(['/signin'], { queryParams: { passwordChanged: 'success' } });
          }
        });
      }
    });
  }
}