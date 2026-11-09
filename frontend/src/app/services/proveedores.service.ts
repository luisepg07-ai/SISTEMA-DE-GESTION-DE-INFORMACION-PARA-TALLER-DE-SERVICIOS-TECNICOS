import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Proveedor {
  _id?: string;
  modelo: string;
  precio: number;
  precioespecial?: number;
  distribuidor?: string;
}

@Injectable({ providedIn: 'root' })
export class ProveedoresService {
  
  private apiUrl = `${import.meta.env['NG_APP_API_URL']}proveedores`;

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }

  getProveedor(id: string): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.apiUrl}/${id}`);
  }

  getProveedormodelo(modelo: string): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.apiUrl}/${modelo}`);
  }

  createProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.apiUrl, proveedor);
  }

  updateProveedor(id: string, proveedor: Partial<Proveedor>): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${this.apiUrl}/${id}`, proveedor);
  }

  deleteProveedor(id: string): Observable<Proveedor> {
    return this.http.delete<Proveedor>(`${this.apiUrl}/${id}`);
  }
}
