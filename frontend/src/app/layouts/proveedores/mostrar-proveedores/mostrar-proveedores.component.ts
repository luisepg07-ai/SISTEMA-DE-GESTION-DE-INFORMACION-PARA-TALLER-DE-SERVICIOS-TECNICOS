import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProveedoresRegistradosService, ProveedorRegistrado } from '../../../services/proveedores-registrados.service';
import { HeaderComponent } from '../../../components/header/header.component';
import { ProveedorRegistradoSeleccionadoService } from '../../../services/proveedor-registrado-seleccionado.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mostrar-proveedores',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './mostrar-proveedores.component.html',
  styleUrls: ['./mostrar-proveedores.component.css']
})
export class MostrarProveedoresComponent implements OnInit {
  filtro$: BehaviorSubject<string> = new BehaviorSubject('');
  proveedores: ProveedorRegistrado[] = [];
  proveedoresFiltrados: ProveedorRegistrado[] = [];
  cargando = true;
  error: string | null = null;

  paginaActual = 1;
  proveedoresPorPagina = 7;
  totalPaginas = 1;
  proveedoresPagina: ProveedorRegistrado[] = [];

  constructor(
    private proveedoresService: ProveedoresRegistradosService,
    private router: Router,
    private seleccionadoService: ProveedorRegistradoSeleccionadoService
  ) {}

  ngOnInit() {
    this.obtenerProveedores();
  }

  obtenerProveedores() {
    this.proveedoresService.getAll().subscribe({
      next: data => {
        this.proveedores = data;
        this.cargando = false;
        this.setupFiltro();
      },
      error: () => {
        this.error = 'Error al cargar los proveedores registrados';
        this.cargando = false;
      }
    });
  }

  setupFiltro() {
    this.filtro$.subscribe(f => {
      const filtro = (f || '').trim().toLowerCase();
      if (!filtro) {
        this.proveedoresFiltrados = [...this.proveedores];
      } else {
        this.proveedoresFiltrados = this.proveedores.filter(p =>
          (p.nombreProveedor?.toLowerCase() || '').includes(filtro)
        );
      }
      this.paginaActual = 1;
      this.actualizarPaginacion();
    });
  }

  actualizarPaginacion() {
    this.totalPaginas = Math.max(1, Math.ceil(this.proveedoresFiltrados.length / this.proveedoresPorPagina));
    const inicio = (this.paginaActual - 1) * this.proveedoresPorPagina;
    const fin = inicio + this.proveedoresPorPagina;
    this.proveedoresPagina = this.proveedoresFiltrados.slice(inicio, fin);
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

  editarProveedor(prov: ProveedorRegistrado) {
    this.seleccionadoService.setProveedor(prov);
     this.router.navigate(['/editar-proveedor']);
  }
}
