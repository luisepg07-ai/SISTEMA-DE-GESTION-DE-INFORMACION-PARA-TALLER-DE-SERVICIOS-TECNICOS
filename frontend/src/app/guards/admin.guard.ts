import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.authService.obtenerToken();

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decodedToken = this.authService.decodificarToken(token);
      
      if (decodedToken.permisos && decodedToken.permisos.admin === true) {
        return true;
      }

      this.router.navigate(['/mostrar-registros']);
      return false;
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
