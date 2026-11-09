import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stock } from './stock.service';

@Injectable({ providedIn: 'root' })
export class StockSeleccionadoService {
  private stockSubject = new BehaviorSubject<Stock | null>(null);
  stockSeleccionado$ = this.stockSubject.asObservable();

  setStock(stock: Stock) {
    this.stockSubject.next(stock);
  }

  limpiarStock() {
    this.stockSubject.next(null);
  }
}
