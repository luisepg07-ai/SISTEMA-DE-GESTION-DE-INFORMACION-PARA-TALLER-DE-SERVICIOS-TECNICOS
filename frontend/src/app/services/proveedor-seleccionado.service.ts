import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Proveedor } from './proveedores.service';

@Injectable({ providedIn: 'root' })
export class ProveedorSeleccionadoService {
  private proveedorSeleccionadoSubject = new BehaviorSubject<Proveedor | null>(null);
  proveedorSeleccionado$ = this.proveedorSeleccionadoSubject.asObservable();

  setProveedor(proveedor: Proveedor | null) {
    this.proveedorSeleccionadoSubject.next(proveedor);
    console.log(proveedor)
  }

  getProveedorActual(): Proveedor | null {
    return this.proveedorSeleccionadoSubject.value;
  }
}
