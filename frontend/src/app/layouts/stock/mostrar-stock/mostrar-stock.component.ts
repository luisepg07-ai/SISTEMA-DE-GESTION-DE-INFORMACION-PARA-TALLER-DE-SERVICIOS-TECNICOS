import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { StockService, Stock } from '../../../services/stock.service';
import { StockSeleccionadoService } from '../../../services/stock-seleccionado.service';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-mostrar-stock',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './mostrar-stock.component.html',
  styleUrls: ['./mostrar-stock.component.css']
})
export class MostrarStockComponent implements OnInit {
  stock: Stock[] = [];
  stockFiltrado: Stock[] = [];
  filtro$: BehaviorSubject<string> = new BehaviorSubject('');
  cargando = true;
  error: string | null = null;
  paginaActual = 1;
  itemsPorPagina = 6;
  totalPaginas = 1;
  stockPagina: Stock[] = [];

  constructor(private stockService: StockService, private stockSeleccionadoService: StockSeleccionadoService, private router: Router) {}

  seleccionarStock(stock: Stock) {
    this.stockSeleccionadoService.setStock(stock);
    console.log('Stock seleccionado:', stock);
    this.router.navigate(['/editar-stock']);
  }

  ngOnInit() {
    this.obtenerStock();
  }

  obtenerStock() {
    this.stockService.getStock().subscribe({
      next: (data) => {
        this.stock = data;
        this.cargando = false;
        this.setupFiltro();
      },
      error: () => {
        this.error = 'Error al cargar el stock';
        this.cargando = false;
      }
    });
  }

  setupFiltro() {
    combineLatest([
      this.filtro$,
      new BehaviorSubject(this.stock)
    ]).subscribe(([filtro, stock]) => {
      const f = filtro.trim().toLowerCase();
      if (!f) {
        this.stockFiltrado = [...this.stock];
      } else {
        this.stockFiltrado = this.stock.filter(item =>
          (item.componente?.toLowerCase() || '').includes(f) ||
          (item.descripcion?.toLowerCase() || '').includes(f) ||
          item.cantidad.toString().includes(f)
        );
      }
      this.paginaActual = 1;
      this.actualizarPaginacion();
    });
  }

  actualizarPaginacion() {
    this.totalPaginas = Math.ceil(this.stockFiltrado.length / this.itemsPorPagina) || 1;
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.stockPagina = this.stockFiltrado.slice(inicio, fin);
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
}
