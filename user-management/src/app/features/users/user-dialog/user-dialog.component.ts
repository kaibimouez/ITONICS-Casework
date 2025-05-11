import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Role } from '../../../core/models/role.model';
import { User } from '../../../core/models/user.model';
import { RolesService } from '../../../core/services/roles.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  standalone: true,
  selector: 'app-user-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],

})
export class UserDialogComponent implements OnInit {
  user: User = { username: '', password: '', fullName: '', roleId: 1 };
  isEdit = false;
  roles: Role[] = [];

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | null,
    private userService: UserService,
    private rolesService: RolesService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.user = { ...this.data };
      this.isEdit = true;
    }

    this.rolesService.getRoles().subscribe(roles => this.roles = roles);
  }

  save(): void {
    const request$ = this.isEdit
      ? this.userService.updateUser(this.user)
      : this.userService.createUser(this.user);

    request$.subscribe(() => this.dialogRef.close(true));
  }
}
