import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { IUser } from '../types/user.interface';

export const authGuard: CanActivateFn = (route) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const userinfo: IUser | null = userService.getUserDataFromStorage();
  if (userinfo) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
