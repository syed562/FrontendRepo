import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth-service';
import { UserRole } from '../ROLE/user-role.enum';

export const userOrAdminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.currentUser.pipe(
    take(1),
    map(user => {
      console.log('Guard → currentUser:', user);
      if (!user) {
        router.navigate(['/']);
        return false;
      }

      const roles = user.roles ?? [];
      console.log('Guard → roles:', roles);
    

      if (
        roles.includes(UserRole.ROLE_USER) ||
        roles.includes(UserRole.ROLE_ADMIN)
      ) {
        console.log(' Guard passed');
        return true;
      }
      console.log(' Guard failed, redirecting');
      router.navigate(['/']);
      return false;
    })
  );
};
