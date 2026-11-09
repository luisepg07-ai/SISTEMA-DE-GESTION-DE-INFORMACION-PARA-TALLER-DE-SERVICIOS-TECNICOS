import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotasService, Nota } from '../../../services/notas.service';
import { NotaSeleccionadaService } from '../../../services/nota-seleccionada.service';
import { HeaderComponent } from '../../../components/header/header.component';
import { Router, RouterModule } from '@angular/router'

@Component({
  selector: 'app-editar-nota',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './editar-nota.component.html',
  styleUrls: ['./editar-nota.component.css']
})
export class EditarNotaComponent implements OnInit {
  mostrarConfirmacion = false;

  eliminarNota() {
    this.mostrarConfirmacion = true;
  }

  confirmarEliminacion() {
    if (!this.notaId) return;
    this.notasService.deleteNota(this.notaId).subscribe({
      next: () => {
        this.exito = false;
        this.error = null;
        this.mostrarConfirmacion = false;
        setTimeout(() => this.router.navigate(['/mostrar-notas']), 500);
      },
      error: () => {
        this.error = 'Error al eliminar la nota';
        this.mostrarConfirmacion = false;
      }
    });
  }
  notaForm;
  enviado = false;
  exito = false;
  error: string | null = null;
  notaId: string | undefined;

  constructor(
    private fb: FormBuilder,
    private notasService: NotasService,
    private notaSeleccionadaService: NotaSeleccionadaService,
    private router: Router
  ) {
    this.notaForm = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.notaSeleccionadaService.notaSeleccionada$.subscribe(nota => {
      if (nota) {
        this.notaId = nota._id;
        this.notaForm.patchValue({
          titulo: nota.titulo,
          contenido: nota.contenido
        });
      }
    });
  }

  editarNota() {
    this.enviado = true;
    this.error = null;
    this.exito = false;
    if (!this.notaId) return;
    if (this.notaForm.invalid) {
      this.error = 'Por favor completa los campos requeridos.';
      this.enviado = false;
      return;
    }
    const raw = this.notaForm.value;
    const nota: Partial<Nota> = {
      titulo: raw.titulo ?? '',
      contenido: raw.contenido ?? ''
    };
    this.notasService.updateNota(this.notaId, nota).subscribe({
      next: () => {
        this.exito = true;
        this.enviado = false;
        setTimeout(() => this.router.navigate(['/mostrar-notas']), 500);
      },
      error: () => {
        this.error = 'Error al editar la nota';
        this.enviado = false;
      }
    });
  }
}
