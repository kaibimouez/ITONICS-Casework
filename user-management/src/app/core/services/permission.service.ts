import { Injectable, inject, computed } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../state/auth/auth.selectors';
import { RolesService } from './roles.service';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private store = inject(Store);
  private rolesService = inject(RolesService);
  private user = this.store.selectSignal(selectUser);

  private currentRole = computed(() =>
    this.rolesService.getCachedRoles()?.find(r => r.id === this.user()?.roleId)
  );

  hasPermission(permissionId: number): boolean {
    return this.currentRole()?.permissions.includes(permissionId) ?? false;
  }

  getAllPermissions(): number[] {
    return this.currentRole()?.permissions ?? [];
  }
}
