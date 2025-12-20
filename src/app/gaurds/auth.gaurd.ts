import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/Authentication/auth-service';
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.currentUser.pipe(
    take(1),
    map(user => {
      if (user) return true;
      router.navigate(['/signin']);
      return false;
    })
  );
};
