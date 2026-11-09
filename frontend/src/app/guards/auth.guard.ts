import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    return true;
  }
  const router = inject(Router);
  router.navigate(['/login']);
  return false;
};
