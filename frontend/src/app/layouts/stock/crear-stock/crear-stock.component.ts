import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StockService, Stock } from '../../../services/stock.service';
import { Router, RouterModule } from '@angular/router'

@Component({
  selector: 'app-crear-stock',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-stock.component.html',
  styleUrls: ['./crear-stock.component.css']
})
export class CrearStockComponent {
  stockForm;
  enviado = false;
  exito = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private stockService: StockService, private router: Router) {
    this.stockForm = this.fb.group({
      componente: ['', Validators.required],
      descripcion: [''],
      cantidad: [0, [Validators.required, Validators.min(0)]]
    });
  }

  crearStock() {
    this.enviado = true;
    this.error = null;
    this.exito = false;
    if (this.stockForm.invalid) {
      this.error = 'Por favor completa los campos requeridos.';
      this.enviado = false;
      return;
    }
    const stock: Stock = this.stockForm.value as Stock;
    this.stockService.createStock(stock).subscribe({
      next: () => {
        this.exito = true;
        this.stockForm.reset();
        this.enviado = false;
        setTimeout(() => this.router.navigate(['/mostrar-stock']), 500);
      },
      error: () => {
        this.error = 'Error al crear el componente en stock';
        this.enviado = false;
      }
    });
  }
}
