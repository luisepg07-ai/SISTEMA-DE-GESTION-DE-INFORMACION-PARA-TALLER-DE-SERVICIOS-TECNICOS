import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private apiUrl = `${import.meta.env['NG_APP_API_URL']}auth`;
  
  constructor(private http: HttpClient) {}

  login(nombre: string, contraseña: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, { nombre, contraseña });
  }

  guardarToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('jwt');
  }

  limpiarToken() {
    localStorage.removeItem('jwt');
  }


  public decodificarToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Error al decodificar el token');
    }
  }
}
