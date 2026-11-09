import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Registro {
  _id?: string;
  nombre: string;
  fecha: string;
  dano: string;
  reparacion: string;
  saldoPagar: number;
  telefono: string;
  nota?: string;
  estado: string;
  dispositivo: string;
  modelo: string;
  patron?: number[];
  componentesUsados?: any[];
}

@Injectable({ providedIn: 'root' })
export class RegistrosService {
  
  private apiUrl = `${import.meta.env['NG_APP_API_URL']}registros`;

  constructor(private http: HttpClient) {}

  getRegistros(): Observable<Registro[]> {
    return this.http.get<Registro[]>(this.apiUrl);
  }

  getRegistro(id: string): Observable<Registro> {
    return this.http.get<Registro>(`${this.apiUrl}/${id}`);
  }

  createRegistro(registro: Registro): Observable<Registro> {
    return this.http.post<Registro>(this.apiUrl, registro);
  }

  updateRegistro(id: string, registro: Partial<Registro>): Observable<Registro> {
    return this.http.put<Registro>(`${this.apiUrl}/${id}`, registro);
  }

  deleteRegistro(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
