import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedoresService, Proveedor } from '../../../services/proveedores.service';
import { ProveedorSeleccionadoService } from '../../../services/proveedor-seleccionado.service';
import { Router, RouterModule } from '@angular/router';
import { ProveedoresRegistradosService, ProveedorRegistrado } from '../../../services/proveedores-registrados.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit, OnDestroy {
  mostrarConfirmacion = false;
  private subscriptions: Subscription = new Subscription();

  eliminarProducto() {
    this.mostrarConfirmacion = true;
  }

  confirmarEliminacion() {
    const { _id } = this.productoForm.value || '';
    if (!_id) return;
    this.subscriptions.add(
      this.proveedoresService.deleteProveedor(_id).subscribe({
        next: () => {
          this.exito = false;
          this.error = null;
          this.mostrarConfirmacion = false;
          setTimeout(() => this.router.navigate(['/mostrar-productos']), 500);
        },
        error: () => {
          this.error = 'Error al eliminar el producto';
          this.mostrarConfirmacion = false;
        }
      })
    );
  }
  productoForm;
  enviado = false;
  exito = false;
  error: string | null = null;
  proveedoresRegistrados: ProveedorRegistrado[] = [];


  constructor(
    private fb: FormBuilder,
    private proveedoresService: ProveedoresService,
    private proveedoresRegistradosService: ProveedoresRegistradosService,
    private proveedorSeleccionadoService: ProveedorSeleccionadoService,
    private router: Router
  ) {
    this.productoForm = this.fb.group({
      _id: [''],
      modelo: ['', Validators.required],
      precio: [0, [Validators.required]],
      precioespecial: [0],
      distribuidor: ['']
    });
  }

  ngOnInit() {
    this.subscriptions.add(
      this.proveedoresRegistradosService.getAll().subscribe({
        next: (list) => this.proveedoresRegistrados = list,
        error: () => {
          this.proveedoresRegistrados = [];
        }
      })
    );
    this.subscriptions.add(
      this.proveedorSeleccionadoService.proveedorSeleccionado$.subscribe(proveedor => {
        if (proveedor) {
          this.productoForm.patchValue(proveedor);
        }
      })
    );
  }

  editarProducto() {
    this.enviado = true;
    this.error = null;
    this.exito = false;
    console.log(this.productoForm.value);

    if (this.productoForm.invalid) {
      this.error = 'Por favor completa los campos requeridos.';
      this.enviado = false;
      return;
    }

    const { _id, modelo, precio, precioespecial, distribuidor } = this.productoForm.value;
    this.subscriptions.add(
      this.proveedoresService.updateProveedor(_id ?? '', { modelo: modelo || '', precio: precio ?? 0, precioespecial: precioespecial ?? 0, distribuidor: distribuidor || '' }).subscribe({
        next: () => {
          this.exito = true;
          setTimeout(() => this.router.navigate(['/mostrar-productos']), 1200);
        },
        error: () => {
          this.error = 'Error al editar el producto';
          this.enviado = false;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
