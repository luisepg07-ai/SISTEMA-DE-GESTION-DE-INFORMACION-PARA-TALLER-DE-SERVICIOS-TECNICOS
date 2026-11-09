import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProveedoresService, Proveedor } from '../../../services/proveedores.service';
import { ProveedorSeleccionadoService } from '../../../services/proveedor-seleccionado.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-mostrar-producto',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './mostrar-producto.component.html',
  styleUrls: ['./mostrar-producto.component.css']
})
export class MostrarProductoComponent implements OnInit {
  
  filtro$: BehaviorSubject<string> = new BehaviorSubject('');
  proveedores: Proveedor[] = [];
  proveedoresFiltrados: Proveedor[] = [];
  cargando = true;
  error: string | null = null;

  paginaActual = 1;
  proveedoresPorPagina = 7;
  totalPaginas = 1;
  proveedoresPagina: Proveedor[] = [];

  constructor(
    private proveedoresService: ProveedoresService,
    private proveedorSeleccionadoService: ProveedorSeleccionadoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerProveedores();
  }

  obtenerProveedores() {
    this.proveedoresService.getProveedores().subscribe({
      next: (data) => {
        this.proveedores = data;
        this.cargando = false;
        this.setupFiltro();
      },
      error: () => {
        this.error = 'Error al cargar los proveedores';
        this.cargando = false;
      }
    });
  }

  setupFiltro() {
    combineLatest([
      this.filtro$,
      new BehaviorSubject(this.proveedores)
    ]).subscribe(([filtro, proveedores]) => {
      const f = filtro.trim().toLowerCase();
      if (!f) {
        this.proveedoresFiltrados = [...this.proveedores];
      } else {
        this.proveedoresFiltrados = this.proveedores.filter(p =>
          (p.modelo?.toLowerCase() || '').includes(f) ||
          p.precio.toString().includes(f) ||
          (p.distribuidor?.toLowerCase() || '').includes(f)
        );
      }
      this.paginaActual = 1;
      this.actualizarPaginacion();
    });
  }

  actualizarPaginacion() {
    this.totalPaginas = Math.ceil(this.proveedoresFiltrados.length / this.proveedoresPorPagina) || 1;
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

  seleccionarProveedor(proveedor: Proveedor) {
    this.proveedorSeleccionadoService.setProveedor(proveedor);
    this.router.navigate(['/editar-producto']);
  }
}
