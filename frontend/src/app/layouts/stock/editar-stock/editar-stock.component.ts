import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StockService, Stock } from '../../../services/stock.service';
import { StockSeleccionadoService } from '../../../services/stock-seleccionado.service';

@Component({
  selector: 'app-editar-stock',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-stock.component.html',
  styleUrls: ['./editar-stock.component.css']
})
export class EditarStockComponent implements OnInit {
  mostrarConfirmacion = false;

  eliminarStock() {
    this.mostrarConfirmacion = true;
  }

  confirmarEliminacion() {
    if (!this.stockId) return;
    this.stockService.deleteStock(this.stockId).subscribe({
      next: () => {
        this.exito = false;
        this.error = null;
        this.mostrarConfirmacion = false;
        setTimeout(() => this.router.navigate(['/mostrar-stock']), 500);
      },
      error: () => {
        this.error = 'Error al eliminar el componente en stock';
        this.mostrarConfirmacion = false;
      }
    });
  }
  stockForm;
  enviado = false;
  exito = false;
  error: string | null = null;
  stockId: string | undefined;

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private stockSeleccionadoService: StockSeleccionadoService,
    private router: Router
  ) {
    this.stockForm = this.fb.group({
      componente: ['', Validators.required],
      descripcion: [''],
      cantidad: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.stockSeleccionadoService.stockSeleccionado$.subscribe(stock => {
      if (stock) {
        this.stockId = stock._id;
        this.stockForm.patchValue({
          componente: stock.componente,
          descripcion: stock.descripcion,
          cantidad: stock.cantidad
        });
      }
    });
  }

  editarStock() {
    this.enviado = true;
    this.error = null;
    this.exito = false;
    if (!this.stockId) return;
    if (this.stockForm.invalid) {
      this.error = 'Por favor completa los campos requeridos.';
      this.enviado = false;
      return;
    }
    const raw = this.stockForm.value;
    const stock: Partial<Stock> = {
      componente: raw.componente ?? '',
      descripcion: raw.descripcion ?? '',
      cantidad: raw.cantidad ?? 0
    };
    this.stockService.updateStock(this.stockId, stock).subscribe({
      next: () => {
        this.exito = true;
        this.enviado = false;
        setTimeout(() => this.router.navigate(['/mostrar-stock']), 500);
      },
      error: () => {
        this.error = 'Error al editar el componente en stock';
        this.enviado = false;
      }
    });
  }
}
