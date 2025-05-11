import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Permission } from '../../core/models/permission.model';
import { Role } from '../../core/models/role.model';


@Injectable({ providedIn: 'root' })
export class RolesService {
  private baseUrl = 'http://localhost:3000';
  private rolesCache: Role[] = [];

  constructor(private http: HttpClient) {}

  getCachedRoles(): Role[] {
    return this.rolesCache;
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/roles`).pipe(
      tap(roles => this.rolesCache = roles)
    );
  }

  getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.baseUrl}/permissions`);
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/roles/${id}`);
  }

  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.baseUrl}/roles`, role);
  }

  updateRole(role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/roles/${role.id}`, role);
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/roles/${id}`);
  }

  /**
   * Utility: Check if any user is assigned this role
   */
  isRoleInUse(roleId: number): Observable<boolean> {
    return this.http.get<any[]>(`${this.baseUrl}/users?roleId=${roleId}`).pipe(
      map(users => users.length > 0)
    );
  }
}
