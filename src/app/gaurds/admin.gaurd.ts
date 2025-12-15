import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth-service';
import { UserRole } from '../enums/user-role.enum';
export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.currentUser.pipe(
    take(1),
    map(u => {
      if (u?.roles?.includes(UserRole.ROLE_ADMIN)) return true;
      router.navigate(['/signin']);
      return false;
    }) //we define pipe but wont call subscribe angular router subscribes internally
  );
};
