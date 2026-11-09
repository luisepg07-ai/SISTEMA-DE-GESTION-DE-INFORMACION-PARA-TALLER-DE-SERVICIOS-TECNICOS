import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrosService, Registro } from '../../../services/registros.service';
import { RegistroSeleccionadoService } from '../../../services/registro-seleccionado.service';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, combineLatest, forkJoin, Subscription } from 'rxjs';
import { StockService, Stock } from '../../../services/stock.service';
import { PatronComponent } from '../../../components/patron/patron.component';

@Component({
  selector: 'app-editar-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, PatronComponent],
  templateUrl: './editar-registro.component.html',
  styleUrls: ['./editar-registro.component.css']
})
export class EditarRegistroComponent implements OnInit, OnDestroy {
  mostrarConfirmacion = false;
  private subscriptions: Subscription = new Subscription();
  eliminarRegistro() {
    const id = this.registroForm.value._id;
    if (!id) return;
    this.mostrarConfirmacion = true;
  }

  confirmarEliminacion() {
    const id = this.registroForm.value._id || '';
    this.mostrarConfirmacion = false;
    this.subscriptions.add(
      this.registrosService.deleteRegistro(id).subscribe({
        next: () => {
          this.exito = false;
          this.error = null;
          setTimeout(() => this.router.navigate(['/mostrar-registros']), 500);
        },
        error: () => {
          this.error = 'Error al eliminar el registro';
        }
      })
    );
  }

  registroForm;
  enviado = false;
  error: string | null = null;
  exito: boolean = false;
  patron: number[] = [];

  mostrarModalStock: boolean = false;
  stockList: Stock[] = [];
  stockListOriginal: Stock[] = [];
  filtroStock$: BehaviorSubject<string> = new BehaviorSubject('');
  cargandoStock: boolean = false;

  componentesSeleccionados: Stock[] = [];
  componentesOriginales: Stock[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 7;

  get paginatedStockList(): Stock[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.stockList.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.stockList.length / this.itemsPerPage) || 1;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  constructor(
    private fb: FormBuilder,
    private registrosService: RegistrosService,
    private registroSeleccionadoService: RegistroSeleccionadoService,
    private router: Router,
    private stockService: StockService
  ) {
    this.registroForm = this.fb.group({
      _id: [''],
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      dano: ['', Validators.required],
      reparacion: ['', Validators.required],
      saldoPagar: [0, Validators.required],
      telefono: ['', Validators.required],
      nota: [''],
      estado: ['', Validators.required],
      dispositivo: ['', Validators.required],
      modelo: ['', Validators.required],
    });
    this.setupFiltroStock();
  }

  setupFiltroStock() {
    this.subscriptions.add(
      combineLatest([
        this.filtroStock$,
        new BehaviorSubject(this.stockListOriginal)
      ]).subscribe(([filtro, stock]) => {
        const f = filtro.trim().toLowerCase();
        if (!f) {
          this.stockList = [...this.stockListOriginal];
        } else {
          const palabras = f.split(' ');
          this.stockList = this.stockListOriginal.filter(item =>
            palabras.every(palabra =>
              (item.componente?.toLowerCase() || '').includes(palabra)
            )
          );
        }
        this.currentPage = 1;
      })
    );
  }

  ngOnInit() {
    this.subscriptions.add(
      this.registroSeleccionadoService.registroSeleccionado$.subscribe(registro => {
        if (registro) {
          const fecha = new Date(registro.fecha);
          const offset = fecha.getTimezoneOffset();
          const localDate = new Date(fecha.getTime() - offset * 60000);
          registro.fecha = localDate.toISOString().slice(0, 16);
          this.registroForm.patchValue(registro);
          this.patron = registro.patron ?? [];
          if (registro.componentesUsados && Array.isArray(registro.componentesUsados)) {
            this.componentesSeleccionados = [...registro.componentesUsados];
            this.componentesOriginales = [...registro.componentesUsados];
          } else {
            this.componentesSeleccionados = [];
            this.componentesOriginales = [];
          }
        }
      })
    );
  }

  editarRegistro() {
    this.enviado = true;
    this.error = null;
    this.exito = false;
    if (this.registroForm.invalid) {
      this.error = 'Por favor completa los campos requeridos.';
      this.enviado = false;
      return;
    }
    const { _id, ...rest } = this.registroForm.value;
    const registroEditado: Partial<Registro> = {
      ...rest,
      nombre: rest.nombre ?? '',
      fecha: rest.fecha ?? '',
      dano: rest.dano ?? '',
      reparacion: rest.reparacion ?? '',
      saldoPagar: rest.saldoPagar ?? 0,
      telefono: rest.telefono ?? '',
      nota: rest.nota ?? '',
      estado: rest.estado ?? '',
      dispositivo: rest.dispositivo ?? '',
      modelo: rest.modelo ?? '',
      patron: this.patron, 
      componentesUsados: this.componentesSeleccionados.length > 0 ? this.componentesSeleccionados : undefined
    };
    this.subscriptions.add(
      this.registrosService.updateRegistro(_id ?? '', registroEditado).subscribe({
        next: () => {
          const agregados = this.componentesSeleccionados.filter(
            actual => !this.componentesOriginales.some(orig => orig._id === actual._id)
          );
          const quitados = this.componentesOriginales.filter(
            orig => !this.componentesSeleccionados.some(actual => actual._id === orig._id)
          );

          const peticiones: any[] = [];
          agregados.forEach(c => peticiones.push(this.stockService.updateStock(c._id!, { cantidad: c.cantidad - 1 })));
          quitados.forEach(c => peticiones.push(this.stockService.updateStock(c._id!, { cantidad: c.cantidad + 1 })));

          if (peticiones.length > 0) {
            this.subscriptions.add(
              forkJoin(peticiones).subscribe({
                next: () => this.finalizarEdicion(),
                error: (err) => {
                  console.error('Error actualizando stock al editar', err);
                  this.finalizarEdicion();
                }
              })
            );
          } else {
            this.finalizarEdicion();
          }
        },
        error: () => {
          this.error = 'Error al editar el registro';
          this.enviado = false;
        }
      })
    );
  }

  private finalizarEdicion() {
    this.exito = true;
    setTimeout(() => this.router.navigate(['/mostrar-registros']), 1200);
  }

  abrirModalStock() {
    this.mostrarModalStock = true;
    this.cargandoStock = true;
    this.subscriptions.add(
      this.stockService.getStock().subscribe({
        next: (data) => {
          this.stockListOriginal = data;
          this.stockList = [...data];
          this.cargandoStock = false;
          this.filtroStock$.next('');
          this.currentPage = 1;
        },
        error: (err) => {
          console.error('Error al cargar el stock', err);
          this.cargandoStock = false;
        }
      })
    );
  }

  cerrarModalStock() {
    this.mostrarModalStock = false;
  }

  onFiltroStockChange(valor: string) {
    this.filtroStock$.next(valor);
  }

  agregarComponente(item: Stock) {
    if (item.cantidad <= 0) {
      return;
    }
    const existe = this.componentesSeleccionados.find(c => c._id === item._id);
    if (!existe) {
      this.componentesSeleccionados.push(item);
    }
  }

  quitarComponente(index: number) {
    this.componentesSeleccionados.splice(index, 1);
  }

  onPatronChange(secuencia: number[]) {
    this.patron = secuencia;
  }
  onResetPatron(secuencia: number[]) {
    this.patron = [];
    console.log('Patrón limpiado:', this.patron);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
