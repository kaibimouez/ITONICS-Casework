import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { RolesService } from '../../core/services/roles.service';
import { Role } from '../../core/models/role.model';
import { RoleDialogComponent } from './role-dialog/role-dialog.component';

@Component({
  standalone: true,
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ]
})
export class RolesComponent implements OnInit {
  private service = inject(RolesService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  roles: Role[] = [];
  columns = ['name', 'actions'];

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.service.getRoles().subscribe(data => {
      this.roles = data;
    });
  }

  openRoleDialog(role?: Role) {
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      width: '400px',
      data: role
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadRoles();
    });
  }

  confirmDelete(role: Role) {
    this.service.isRoleInUse(role.id!).subscribe(inUse => {
      if (inUse) {
        this.snackBar.open('Cannot delete role assigned to user.', 'Close', { duration: 3000 });
        return;
      }

      if (confirm(`Are you sure you want to delete role "${role.name}"?`)) {
        this.service.deleteRole(role.id!).subscribe(() => {
          this.snackBar.open('Role deleted.', 'Close', { duration: 2000 });
          this.loadRoles();
        });
      }
    });
  }
}
