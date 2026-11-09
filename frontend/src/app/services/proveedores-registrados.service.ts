import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProveedorRegistrado {
  _id?: string;
  nombreProveedor: string;
  contactoEmail?: string;
  telefono?: string;
}

@Injectable({ providedIn: 'root' })
export class ProveedoresRegistradosService {
  
  private apiUrl = `${import.meta.env['NG_APP_API_URL']}proveedores-registrados`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProveedorRegistrado[]> {
    return this.http.get<ProveedorRegistrado[]>(this.apiUrl);
  }

  getById(id: string): Observable<ProveedorRegistrado> {
    return this.http.get<ProveedorRegistrado>(`${this.apiUrl}/${id}`);
  }

  create(proveedorRegistrado:ProveedorRegistrado): Observable<ProveedorRegistrado> {
    return this.http.post<ProveedorRegistrado>(this.apiUrl, proveedorRegistrado);
  }

  update(id: string, payload: Partial<ProveedorRegistrado>): Observable<ProveedorRegistrado> {
    return this.http.put<ProveedorRegistrado>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
