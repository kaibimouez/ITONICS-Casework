import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../state/auth/auth.selectors';
import { RolesService } from '../services/roles.service';
import { map, take } from 'rxjs';

export function PermissionGuard(requiredPermission: number): CanActivateFn {
  return () => {
    const store = inject(Store);
    const router = inject(Router);
    const rolesService = inject(RolesService);

    return store.select(selectUser).pipe(
      take(1),
      map(user => {
        const role = rolesService.getCachedRoles()?.find(r => r.id === user?.roleId);
        const hasPermission = role?.permissions.includes(requiredPermission);

        if (!hasPermission) {
          router.navigate(['/dashboard']);
          return false;
        }
        return true;
      })
    );
  };
}
