import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedoresRegistradosService, ProveedorRegistrado } from '../../../services/proveedores-registrados.service';
import { ProveedorRegistradoSeleccionadoService } from '../../../services/proveedor-registrado-seleccionado.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-editar-proveedor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.css']
})
export class EditarProveedorComponent implements OnInit {
  proveedorForm;
  enviado = false;
  exito = false;
  error: string | null = null;
  proveedorId: string | undefined;
  mostrarConfirmacion = false;

  constructor(
    private fb: FormBuilder,
    private proveedoresService: ProveedoresRegistradosService,
    private seleccionadoService: ProveedorRegistradoSeleccionadoService,
    private router: Router
  ) {
    this.proveedorForm = this.fb.group({
      nombreProveedor: ['', Validators.required],
      contactoEmail: [''],
      telefono: ['']
    });
  }

  ngOnInit() {
    
    this.seleccionadoService.proveedorRegistrado$.subscribe(prov => {
      if (prov) {
        this.proveedorId = prov._id;
        this.proveedorForm.patchValue({
          nombreProveedor: prov.nombreProveedor || '',
          contactoEmail: prov.contactoEmail || '',
          telefono: prov.telefono || ''
        });
      }
    });
  }

  actualizarProveedor() {
    this.enviado = true;
    this.error = null;
    this.exito = false;
    if (!this.proveedorId) return;
    if (this.proveedorForm.invalid) {
      this.error = 'Por favor completa los campos requeridos.';
      this.enviado = false;
      return;
    }
    const { nombreProveedor, contactoEmail, telefono } = this.proveedorForm.value;
    const payload: Partial<ProveedorRegistrado> = {
      nombreProveedor: nombreProveedor || '',
      contactoEmail: contactoEmail || '',
      telefono: telefono || ''
    };
    this.proveedoresService.update(this.proveedorId, payload).subscribe({
      next: () => {
        this.exito = true;
        this.enviado = false;
        setTimeout(() => this.router.navigate(['/mostrar-proveedores-registrados']), 900);
      },
      error: () => {
        this.error = 'Error al actualizar el proveedor';
        this.enviado = false;
      }
    });
  }

  eliminarProveedor() {
    if (!this.proveedorId) {
      this.error = 'No hay proveedor seleccionado para eliminar.';
      return;
    }
    
    this.enviado = true;
    this.error = null;
    this.proveedoresService.delete(this.proveedorId).subscribe({
      next: () => {
        
        this.seleccionadoService.setProveedor(null);
        this.exito = true;
        this.enviado = false;
        setTimeout(() => this.router.navigate(['/mostrar-proveedores-registrados']), 700);
      },
      error: () => {
        this.error = 'Error al eliminar el proveedor';
        this.enviado = false;
      }
    });
  }

  pedirConfirmacion() {
    this.mostrarConfirmacion = true;
  }

  confirmarEliminacion() {
    this.mostrarConfirmacion = false;
    this.eliminarProveedor();
  }
}
