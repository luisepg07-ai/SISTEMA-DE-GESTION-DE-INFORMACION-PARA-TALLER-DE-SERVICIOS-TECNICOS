import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Nota {
  _id?: string;
  titulo: string;
  contenido: string;
}

@Injectable({ providedIn: 'root' })
export class NotasService {

  private apiUrl = `${import.meta.env['NG_APP_API_URL']}notas`;

  constructor(private http: HttpClient) {}

  getNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.apiUrl);
  }

  getNota(id: string): Observable<Nota> {
    return this.http.get<Nota>(`${this.apiUrl}/${id}`);
  }

  createNota(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.apiUrl, nota);
  }

  updateNota(id: string, nota: Partial<Nota>): Observable<Nota> {
    return this.http.put<Nota>(`${this.apiUrl}/${id}`, nota);
  }

  deleteNota(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
