import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { NotasService, Nota } from '../../../services/notas.service';
import { NotaSeleccionadaService } from '../../../services/nota-seleccionada.service';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-mostrar-notas',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FormsModule],
  templateUrl: './mostrar-notas.component.html',
  styleUrls: ['./mostrar-notas.component.css']
})
export class MostrarNotasComponent implements OnInit {
  notas: Nota[] = [];
  notasFiltradas: Nota[] = [];
  
  paginaActual = 1;
  notasPorPagina = 6;
  totalPaginas = 1;
  notasPagina: Nota[] = [];
  filtro$: BehaviorSubject<string> = new BehaviorSubject('');
  cargando = true;
  error: string | null = null;

  constructor(private notasService: NotasService, private notaSeleccionadaService: NotaSeleccionadaService, private router: Router) {}

  ngOnInit() {
    this.notasService.getNotas().subscribe({
      next: (data) => {
        this.notas = data;
        this.setupFiltro();
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar las notas';
        this.cargando = false;
      }
    });
  }

  setupFiltro() {
    combineLatest([
      this.filtro$,
      new BehaviorSubject(this.notas)
    ]).subscribe(([filtro, notas]) => {
      const f = filtro.trim().toLowerCase();
      if (!f) {
        this.notasFiltradas = [...this.notas];
      } else {
        this.notasFiltradas = this.notas.filter(nota =>
          (nota.titulo?.toLowerCase() || '').includes(f) ||
          (nota.contenido?.toLowerCase() || '').includes(f)
        );
      }
      this.paginaActual = 1;
      this.actualizarPaginacion();
    });
  }

  actualizarPaginacion() {
    this.totalPaginas = Math.ceil(this.notasFiltradas.length / this.notasPorPagina) || 1;
    const inicio = (this.paginaActual - 1) * this.notasPorPagina;
    const fin = inicio + this.notasPorPagina;
    this.notasPagina = this.notasFiltradas.slice(inicio, fin);
  }

  cambiarPagina(delta: number) {
    this.paginaActual += delta;
    if (this.paginaActual < 1) this.paginaActual = 1;
    if (this.paginaActual > this.totalPaginas) this.paginaActual = this.totalPaginas;
    this.actualizarPaginacion();
  }

  onFiltroChange(valor: string) {
    this.filtro$.next(valor);
  }

  seleccionarNota(nota: Nota) {
    this.notaSeleccionadaService.setNota(nota);
    this.router.navigate(['/editar-nota']);
  }

}
