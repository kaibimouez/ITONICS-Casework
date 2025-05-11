import { Injectable } from '@angular/core';
import { RolesService } from './roles.service';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppInitService {
  constructor(private rolesService: RolesService) {}

  async init(): Promise<void> {
    await firstValueFrom(this.rolesService.getRoles());
  }
}
