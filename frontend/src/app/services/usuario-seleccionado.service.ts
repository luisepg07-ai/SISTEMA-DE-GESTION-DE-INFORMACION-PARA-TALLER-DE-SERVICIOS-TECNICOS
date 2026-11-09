import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from './usuario.service';

@Injectable({ providedIn: 'root' })
export class UsuarioSeleccionadoService {
  private usuarioSeleccionadoSubject = new BehaviorSubject<Usuario | null>(null);
  usuarioSeleccionado$ = this.usuarioSeleccionadoSubject.asObservable();

  setUsuario(usuario: Usuario | null) {
    this.usuarioSeleccionadoSubject.next(usuario);
    console.log(usuario);
  }

  getUsuarioActual(): Usuario | null {
    return this.usuarioSeleccionadoSubject.value;
  }
}
