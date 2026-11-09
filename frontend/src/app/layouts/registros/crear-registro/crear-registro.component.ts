import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, forkJoin, Subscription } from 'rxjs';
import { RegistrosService, Registro } from '../../../services/registros.service';
import { Router, RouterModule } from '@angular/router';
import { PatronComponent } from '../../../components/patron/patron.component';
import { StockService, Stock } from '../../../services/stock.service';

@Component({
  selector: 'app-crear-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, PatronComponent],
  templateUrl: './crear-registro.component.html',
  styleUrls: ['./crear-registro.component.css']
})
export class CrearRegistroComponent implements OnDestroy {
  registroForm;
  enviado = false;
  error: string | null = null;
  exito: boolean = false;
  patron: number[] = [];
  interruptor: boolean = false;
  private subscriptions: Subscription = new Subscription();

  mostrarModalStock: boolean = false;
  stockList: Stock[] = [];
  stockListOriginal: Stock[] = [];
  filtroStock$: BehaviorSubject<string> = new BehaviorSubject('');
  cargandoStock: boolean = false;

  componentesSeleccionados: Stock[] = [];

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
    private router: Router,
    private stockService: StockService
  ) {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    const hh = String(hoy.getHours()).padStart(2, '0');
    const min = String(hoy.getMinutes()).padStart(2, '0');
    const fechaActual = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha: [fechaActual, Validators.required],
      dano: ['', Validators.required],
      reparacion: ['', Validators.required],
      saldoPagar: [0, Validators.required],
      telefono: ['', Validators.required],
      nota: [''],
      estado: ['pendiente', Validators.required],
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

  onPatronChange(secuencia: number[]) {
    this.patron = secuencia;
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

  crearRegistroDuplicado() {
    this.enviado = true;
    this.error = null;
    this.exito = false;
    if (this.registroForm.invalid) {
      this.error = 'Por favor completa los campos requeridos.';
      this.enviado = false;
      return;
    }
    
    const ahora = new Date();
    const yyyy = ahora.getFullYear();
    const mm = String(ahora.getMonth() + 1).padStart(2, '0');
    const dd = String(ahora.getDate()).padStart(2, '0');
    const hh = String(ahora.getHours()).padStart(2, '0');
    const min = String(ahora.getMinutes()).padStart(2, '0');
    const ss = String(ahora.getSeconds()).padStart(2, '0');
    const fechaHoraActual = `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`;
    const registro = {
      ...this.registroForm.value,
      nombre: this.registroForm.value.nombre ?? '',
      fecha: fechaHoraActual,
      dano: this.registroForm.value.dano ?? '',
      reparacion: this.registroForm.value.reparacion ?? '',
      saldoPagar: this.registroForm.value.saldoPagar ?? 0,
      telefono: this.registroForm.value.telefono ?? '',
      nota: this.registroForm.value.nota ?? '',
      estado: this.registroForm.value.estado ?? '',
      dispositivo: this.registroForm.value.dispositivo ?? '',
      modelo: this.registroForm.value.modelo ?? '',
      patron: this.patron.length > 0 ? this.patron : undefined,
      componentesUsados: this.componentesSeleccionados.length > 0 ? this.componentesSeleccionados : undefined
    };
    this.subscriptions.add(
      this.registrosService.createRegistro(registro).subscribe({
        next: (res) => {
          if (this.componentesSeleccionados.length > 0) {
            const peticiones = this.componentesSeleccionados.map(c =>
              this.stockService.updateStock(c._id!, { cantidad: c.cantidad - 1 })
            );
            this.subscriptions.add(
              forkJoin(peticiones).subscribe({
                next: () => this.finalizarCreacion(res),
                error: (err) => {
                  console.error('Error actualizando stock', err);
                  this.finalizarCreacion(res);
                }
              })
            );
          } else {
            this.finalizarCreacion(res);
          }
        },
        error: () => {
          this.error = 'Error al crear el registro';
          this.enviado = false;
        }
      })
    );
  }

  private finalizarCreacion(res: any) {
    this.exito = true;
    this.enviado = false;
    if (this.interruptor) {
      this.registroForm.patchValue({
        nombre: res.nombre,
        telefono: res.telefono,
        dano: '',
        reparacion: '',
        saldoPagar: 0,
        nota: '',
        estado: 'pendiente',
        dispositivo: '',
        modelo: ''
      });
      this.componentesSeleccionados = [];
      setTimeout(() => {
        this.exito = false;
        this.interruptor = false;
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, 1000)

    } else {
      this.registroForm.reset();
      this.componentesSeleccionados = [];
      this.interruptor = false;
      setTimeout(() => this.router.navigate(['/mostrar-registros']), 1200);
    }

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
