import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegistrosService } from '../../../services/registros.service';
import type { Registro } from '../../../services/registros.service';
import { RegistroSeleccionadoService } from '../../../services/registro-seleccionado.service';
import { RouterModule, Router } from '@angular/router';
import { NgFor, NgIf, NgClass, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-mostrar-registros',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, NgClass, DatePipe, FormsModule, HeaderComponent],
  templateUrl: './mostrar-registros.component.html',
  styleUrls: ['./mostrar-registros.component.css']
})
export class MostrarRegistrosComponent implements OnInit, OnDestroy {
  registros: Registro[] = [];
  registrosFiltrados: Registro[] = [];
  filtro$: BehaviorSubject<string> = new BehaviorSubject('');
  cargando = true;
  error: string | null = null;

  paginaActual = 1;
  registrosPorPagina = 6;
  totalPaginas = 1;
  registrosPagina: Registro[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private registrosService: RegistrosService,
    private registroSeleccionadoService: RegistroSeleccionadoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerRegistros();
  }

  obtenerRegistros(){
    this.subscriptions.add(
      this.registrosService.getRegistros().subscribe({
        next: (data) => {
          this.registros = data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
          this.cargando = false;
          this.setupFiltro();
        },
        error: () => {
          this.error = 'Error al cargar los registros';
          this.cargando = false;
        }
      })
    );
  }

  setupFiltro() {
    this.subscriptions.add(
      combineLatest([
        this.filtro$,
        new BehaviorSubject(this.registros)
      ]).subscribe(([filtro, registros]) => {
        const f = filtro.trim().toLowerCase();
        if (!f) {
          this.registrosFiltrados = [...this.registros];
        } else {
          this.registrosFiltrados = this.registros.filter(registro =>
            (registro.nombre?.toLowerCase() || '').includes(f) ||
            (registro.dispositivo?.toLowerCase() || '').includes(f) ||
            (registro.modelo?.toLowerCase() || '').includes(f) ||
            (registro.estado?.toLowerCase() || '').includes(f)
          );
        }
        this.paginaActual = 1;
        this.actualizarPaginacion();
      })
    );
  }

  actualizarPaginacion() {
    this.totalPaginas = Math.ceil(this.registrosFiltrados.length / this.registrosPorPagina) || 1;
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.registrosPagina = this.registrosFiltrados.slice(inicio, fin);
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

  seleccionarRegistro(registro: Registro) {
    this.registroSeleccionadoService.setRegistro(registro);
    this.router.navigate(['/editar-registro']);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
