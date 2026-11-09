import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Permiso {
  admin?: boolean;
}

export interface Usuario {
  _id?: string;
  nombre: string;
  contraseña: string;
  permisos?: Permiso;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${import.meta.env['NG_APP_API_URL']}usuarios`;
  constructor(private http: HttpClient) {}

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  getUsuarios(search?: string): Observable<Usuario[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('nombre', search);
    }
    return this.http.get<Usuario[]>(this.apiUrl, { params });
  }

  getUsuarioById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  updateUsuario(id: string, usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
