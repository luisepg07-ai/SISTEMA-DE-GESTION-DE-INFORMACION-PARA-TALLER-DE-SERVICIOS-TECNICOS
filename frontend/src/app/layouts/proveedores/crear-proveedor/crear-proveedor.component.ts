import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedoresRegistradosService } from '../../../services/proveedores-registrados.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-crear-proveedor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.css']
})
export class CrearProveedorComponent {
  proveedorForm;
  enviado = false;
  exito = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private proveedoresRegistradosService: ProveedoresRegistradosService, private router: Router) {
    this.proveedorForm = this.fb.group({
      nombreProveedor: ['', Validators.required],
      contactoEmail: [''],
      telefono: ['']
    });
  }

  crearProveedor() {
    this.enviado = true;
    this.error = null;
    this.exito = false;
    if (this.proveedorForm.invalid) return;
  const { nombreProveedor, contactoEmail, telefono } = this.proveedorForm.value;
  this.proveedoresRegistradosService.create({ nombreProveedor: nombreProveedor || '', contactoEmail: contactoEmail || '', telefono: telefono || '' }).subscribe({
      next: () => {
        this.exito = true;
        this.proveedorForm.reset();
        this.enviado = false;
        setTimeout(() => this.router.navigate(['/mostrar-proveedores-registrados']), 1200);
      },
      error: () => {
        this.error = 'Error al crear el proveedor';
        this.enviado = false;
      }
    });
  }
}