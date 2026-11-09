import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotasService, Nota } from '../../../services/notas.service';
import { HeaderComponent } from '../../../components/header/header.component';
import { Router, RouterModule } from '@angular/router'

@Component({
  selector: 'app-crear-nota',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './crear-nota.component.html',
  styleUrls: ['./crear-nota.component.css']
})
export class CrearNotaComponent {
  notaForm;
  enviado = false;
  exito = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private notasService: NotasService, private router: Router) {
    this.notaForm = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required]
    });
  }

  crearNota() {
    this.enviado = true;
    this.error = null;
    this.exito = false;
    if (this.notaForm.invalid) {
      this.error = 'Por favor completa los campos requeridos.';
      this.enviado = false;
      return;
    }
    const nota: Nota = this.notaForm.value as Nota;
    this.notasService.createNota(nota).subscribe({
      next: () => {
        this.exito = true;
        this.notaForm.reset();
        this.enviado = false;
        setTimeout(() => this.router.navigate(['/mostrar-notas']), 500);
      },
      error: () => {
        this.error = 'Error al crear la nota';
        this.enviado = false;
      }
    });
  }
}
