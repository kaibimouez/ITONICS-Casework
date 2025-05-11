import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../core/state/auth/auth.actions';
import { selectUser } from '../core/state/auth/auth.selectors';
import { PermissionService } from '../core/services/permission.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  templateUrl: 'main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class MainLayoutComponent {
  constructor(public permissionService: PermissionService) {}

  private store = inject(Store);

  user = inject(Store).selectSignal(selectUser); 

  get isSuperAdmin() {
    return this.user()?.username === 'superadmin';
  }

  get canViewUsers() {
    return this.user()?.roleId === 1; 
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
