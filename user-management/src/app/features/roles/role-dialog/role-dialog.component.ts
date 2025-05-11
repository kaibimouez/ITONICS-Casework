import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Role } from '../../../core/models/role.model';
import { Permission } from '../../../core/models/permission.model';
import { RolesService } from '../../../core/services/roles.service';

@Component({
  standalone: true,
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  
})
export class RoleDialogComponent implements OnInit {
  isEdit = false;
  role: Role = { id: 0, name: '', permissions: [] };
  permissions: Permission[] = [];
  rolePermissionMap: Record<number, boolean> = {};

  constructor(
    public dialogRef: MatDialogRef<RoleDialogComponent>,
    private roleService: RolesService,
    @Inject(MAT_DIALOG_DATA) public data: Role | null
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.role = { ...this.data }; // clone to avoid mutating original
      this.isEdit = true;

      // Mark permissions assigned to the role as true
      for (const permId of this.role.permissions) {
        this.rolePermissionMap[permId] = true;
      }
    }

    // Load all available permissions
    this.roleService.getPermissions().subscribe(perms => {
      this.permissions = perms;

      // Ensure every permission is initialized (default to false)
      for (const perm of perms) {
        if (!(perm.id in this.rolePermissionMap)) {
          this.rolePermissionMap[perm.id] = false;
        }
      }
    });
  }

  save(): void {
    const selectedPermissions = Object.entries(this.rolePermissionMap)
      .filter(([_, checked]) => checked)
      .map(([id]) => +id);

    let updatedRole: Role = {
      ...this.role,
      permissions: selectedPermissions
    };

    if (!this.isEdit) {
      const { id, ...rest } = updatedRole;
      updatedRole = { ...rest };
    }

    const request$ = this.isEdit
      ? this.roleService.updateRole(updatedRole)
      : this.roleService.createRole(updatedRole);

    request$.subscribe(() => this.dialogRef.close(true));
  }

}
