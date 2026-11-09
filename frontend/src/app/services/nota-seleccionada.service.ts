import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Nota } from './notas.service';

@Injectable({ providedIn: 'root' })
export class NotaSeleccionadaService {
  private notaSubject = new BehaviorSubject<Nota | null>(null);
  notaSeleccionada$ = this.notaSubject.asObservable();

  setNota(nota: Nota) {
    this.notaSubject.next(nota);
  }

  limpiarNota() {
    this.notaSubject.next(null);
  }
}
