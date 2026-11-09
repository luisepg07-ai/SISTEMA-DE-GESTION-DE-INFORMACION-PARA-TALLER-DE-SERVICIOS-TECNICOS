import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemporizadorService {

  constructor(private http: HttpClient) { }

  temporizador(): Observable<any> {
    return this.http.get<any>(`${import.meta.env['NG_APP_API_URL']}`, { responseType: 'text' as 'json' });
  }
}
