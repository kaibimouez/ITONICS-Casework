import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RolesService } from '../../core/services/roles.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { Role } from '../../core/models/role.model';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  standalone: true,
  selector: 'app-users',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  private rolesService = inject(RolesService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  users: User[] = [];
  roles: Role[] = [];
  columns = ['fullName', 'username', 'role', 'actions'];

  ngOnInit(): void {
    this.loadUsers();
    this.rolesService.getRoles().subscribe(r => this.roles = r);
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(u => this.users = u);
  }

  getRoleName(roleId: number): string {
    return this.roles.find(r => r.id === roleId)?.name || 'Unknown';
  }

  openUserDialog(user?: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadUsers();
    });
  }

  confirmDelete(user: User) {
    if (confirm(`Delete user "${user.fullName}"?`)) {
      this.userService.deleteUser(user.id!).subscribe(() => {
        this.snackBar.open('User deleted.', 'Close', { duration: 2000 });
        this.loadUsers();
      });
    }
  }
}
