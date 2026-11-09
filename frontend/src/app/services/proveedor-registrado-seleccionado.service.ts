import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProveedorRegistrado } from './proveedores-registrados.service';

@Injectable({ providedIn: 'root' })
export class ProveedorRegistradoSeleccionadoService {
  private subject = new BehaviorSubject<ProveedorRegistrado | null>(null);
  proveedorRegistrado$ = this.subject.asObservable();

  setProveedor(prov: ProveedorRegistrado | null) {
    this.subject.next(prov);
    console.log(prov);
  }

  getProveedorActual(): ProveedorRegistrado | null {
    return this.subject.value;
  }

  clear() {
    this.subject.next(null);
  }
}
