import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../state/auth/auth.selectors';
import { map, take } from 'rxjs';

export const SuperAdminGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectUser).pipe(
    take(1),
    map(user => {
      if (user?.username === 'superadmin') return true;
      router.navigate(['/dashboard']);
      return false;
    })
  );
};
