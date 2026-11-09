import { Component , OnInit} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  token: string | null = null;
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.token = this.authService.obtenerToken();
    if (this.token) {
      try {
        const decodedToken = this.authService.decodificarToken(this.token);
        this.isAdmin = decodedToken?.permisos?.admin || false;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }

  }
  
  logout() {
    this.authService.limpiarToken();
    this.router.navigate(['/login']);
  }
}
