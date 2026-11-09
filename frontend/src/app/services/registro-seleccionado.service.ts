import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Registro } from './registros.service';

@Injectable({ providedIn: 'root' })
export class RegistroSeleccionadoService {
  private registroSubject = new BehaviorSubject<Registro | null>(null);
  registroSeleccionado$ = this.registroSubject.asObservable();

  setRegistro(registro: Registro) {
    this.registroSubject.next(registro);
  }

  limpiarRegistro() {
    this.registroSubject.next(null);
  }
}
