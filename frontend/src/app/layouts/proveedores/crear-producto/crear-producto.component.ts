import { Component , OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedoresService } from '../../../services/proveedores.service';
import { ProveedoresRegistradosService, ProveedorRegistrado } from '../../../services/proveedores-registrados.service';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit, OnDestroy {
  productoForm;
  enviado = false;
  exito = false;
  error: string | null = null;
  proveedoresRegistrados: ProveedorRegistrado[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private proveedoresService: ProveedoresService,
    private proveedoresRegistradosService: ProveedoresRegistradosService,
    private router: Router
  ) {
    this.productoForm = this.fb.group({
      modelo: ['', Validators.required],
      precio: [0, [Validators.required]],
      precioespecial: [0],
      distribuidor: ['']
    });
  }

  ngOnInit() {
    this.subscriptions.add(
      this.proveedoresRegistradosService.getAll().subscribe({
        next: (list) => this.proveedoresRegistrados = list,
        error: () => {
          this.proveedoresRegistrados = [];
        }
      })
    );
  }

  crearProducto() {
    this.error = null;
    this.exito = false;
    if (this.productoForm.invalid) {
      this.error = 'Por favor completa los campos requeridos.';
      this.enviado = false;
      return;
    }

    this.enviado = true;
    const { modelo, precio, precioespecial, distribuidor } = this.productoForm.value;
    this.subscriptions.add(
      this.proveedoresService.createProveedor({ modelo: modelo || '', precio: precio ?? 0, precioespecial: precioespecial ?? 0, distribuidor: distribuidor || '' }).subscribe({
        next: () => {
          this.exito = true;
          this.productoForm.reset();
          this.enviado = false;
          setTimeout(() => this.router.navigate(['/mostrar-productos']), 1200);
        },
        error: () => {
          this.error = 'Error al crear el producto';
          this.enviado = false;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }





//funcion
/*
 async llenardb(){
  const productos:any[] = [
  {
    "modelo": "iPhone 5S ZY",
    "precio": 140.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 5SE ZY",
    "precio": 140.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 6G ZY",
    "precio": 140.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 6 Plus ZY",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 6S ZY",
    "precio": 140.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 6S Plus ZY",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 7G ZY",
    "precio": 140.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 7 Plus ZY",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 8G ZY",
    "precio": 140.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 8 Plus ZY",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone SE 2020",
    "precio": 140.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE X Incell ZY 900P",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE XS incell ZY 900P",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE XS MAX INCEL ZY 900P",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE XR INCELL ZY 900P",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 11 INCELL ZY 900P",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 11 Pro Incell ZY 900P",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 11 Pro Max Incell ZY 900P",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 12 Incell ZY 900P",
    "precio": 290.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 12 Pro Incell ZY 900P",
    "precio": 290.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 12 Pro Max Incell ZY 900P",
    "precio": 350.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 12 Mini Incell ZY 900P",
    "precio": 340.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 13 Incell ZY 900P",
    "precio": 320.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 13 Pro Incell ZY 900P",
    "precio": 420.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 13 Pro Max Incell ZY 900P",
    "precio": 450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 13 Mini Incell ZY 900P",
    "precio": 340.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 14 Incell ZY 900P",
    "precio": 320.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 14 Pro Incell ZY 900P",
    "precio": 440.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 14 Pro Max Incell ZY 900P",
    "precio": 520.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 15 Incell ZY 900P",
    "precio": 380.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 15 Pro Incell ZY 900P",
    "precio": 430.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 15 Pro Max incell ZY 900P",
    "precio": 550.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "IPHONE 15 Plus Incell ZY 900P",
    "precio": 430.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone X INCELL COF ZY 1080P",
    "precio": 330.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone XR INCELL COF ZY 1080P",
    "precio": 330.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone XS INCELL COF ZY 1080P",
    "precio": 330.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone XS MAX INCELL COF ZY 1080P",
    "precio": 370.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 11 INCELL COF ZY 1080P",
    "precio": 330.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 11 PRO INCELL ZY 1080P",
    "precio": 380.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 11 PRO MAX INCELL COF ZY 1080P",
    "precio": 390.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 12 INCEL COF ZY 1080P",
    "precio": 380.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 12 MINI COF ZY 1080P",
    "precio": 460.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 12 PRO INCELL COF ZY 1080P",
    "precio": 380.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 12 PRO MAX INCELL COF ZY 1080P",
    "precio": 650.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 13 INCELL COF ZY 1080P",
    "precio": 450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 13 MINI COF ZY 1080P",
    "precio": 480.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 13 PRO INCELL COF ZY 1080P",
    "precio": 520.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 13 PRO MAX INCELL COF ZY 1080P",
    "precio": 590.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 14 INCELL COF ZY 1080P",
    "precio": 470.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 14 PLUS INCELL ZY 1080P",
    "precio": 540.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 14 PRO INCELL ZY 1080P",
    "precio": 550.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 14 PRO MAX INCELL ZY 1080P",
    "precio": 680.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 15 INCELL ZY 1080P",
    "precio": 510.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 15 PRO INCELL ZY 1080P",
    "precio": 580.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 15 PRO MAX INCELL ZY 1080P",
    "precio": 780.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 15 PLUS INCELL ZY 1080P",
    "precio": 680.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 16 INCELL ZY 1080P",
    "precio": 830.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 16 PRO INCELL ZY 1080P",
    "precio": 1850.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 16 PRO MAX COF INCELL ZY 1080P",
    "precio": 2150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 16 PLUS INCELL ZY 1080P",
    "precio": 880.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone XR OEM / ORIGIANL",
    "precio": 480.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone X Amoled GX",
    "precio": 500.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone XR INCELL GX",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone XS Amoled GX",
    "precio": 520.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone XS Max AMOLED GX",
    "precio": 650.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 11 INCELL GX",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 11 Pro AMOLED GX",
    "precio": 590.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 11 Pro Max AMOLED GX",
    "precio": 690.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 12 / 12 pro AMOLED GX",
    "precio": 750.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 12 / 12 pro AMOLED ZY",
    "precio": 750.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 12 MINI AMOLED",
    "precio": 1050.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 12 pro max AMOLED GX",
    "precio": 1050.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 13 AMOLED ZY",
    "precio": 810.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 13 Pro AMOLED ZY",
    "precio": 980.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 13 Pro Max AMOLED",
    "precio": 1080.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 14 AMOLED",
    "precio": 820.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 14 Pro AMOLED",
    "precio": 1700.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 14 PRO MAX AMOLED",
    "precio": 1890.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 15 PRO AMOLED",
    "precio": 1950.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 16E AMOLED",
    "precio": 870.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 16 PRO AMOLED",
    "precio": 2350.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "iPhone 16 PRO MAX AMOLED",
    "precio": 2980.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A01 Core Ori",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A01M Ori",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A01F Ori",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A260/ A2 CORE Ori",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A02S/A03S/A035M Ori",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A02S/A03S/A035M Ori C/M",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A03S 5g/ A037U Ori",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A02S/A03S AMERICANO Ori",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A03 Core Flex bifurcada",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A03 Core Flex bifurcada C/M",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A03/ A03 Core Ori Flex derecho",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A04/ A045 ori",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A04S/ A047F/A04 Core",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A04E",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A05 ORI",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A05S ORI",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A06 ORI",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A06S ORI",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A10 Ori",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A10E Ori",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A10S Ori",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A11 Ori",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A11 incell",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A11 Americano Ori",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A02/A12/A125F Ori",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A02/A12/A125F Ori C/M",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A02/A12/A022F/M127 Ori",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A13/A135F 4G/M33 5G/M23 5G Ori",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A13 5G/ A136U Ori",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A14 4G / A145P",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A14 5G /A146B grande",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A14 5G /A146P chico",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A15 Ori C/M",
    "precio": 1590.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A15 Oled C/M Puldaga pequena",
    "precio": 630.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A15 Oled C/M Puldaga Ori",
    "precio": 700.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A15 INCELL",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A15 INCELL C/M",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A16 Oled C/M Puldaga Ori",
    "precio": 800.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A16 INCELL",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A20 Amoled",
    "precio": 450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A20 Amoled C/M",
    "precio": 480.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A20 Incell Pulgado Ori",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A20 Incell C/M Pulgado Ori",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A20S Ori",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A20S Incell",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A21 Ori",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A21S Ori",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A21S Incell",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A21S Incell C/M",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A22 4G Incell",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A22 4G Incell C/M",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A22 4G Oled C/M",
    "precio": 480.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A22 4G Ori C/M",
    "precio": 590.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A22 5G Ori C/M",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A22 5G Ori",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A23/A235 4G Ori",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A23/A235 4G C/M Ori",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A23 5G Ori",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A24 Oled C/M Pulgada pequena",
    "precio": 570.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A24 Oled C/M Pulgada original",
    "precio": 720.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A24 Oled Pulgada pequena",
    "precio": 550.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A24 Incell C/M",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A24 Incell",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A25 Incell",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A25 Amoled C/M Pulgada pequena",
    "precio": 570.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A25 Amoled C/M Pulgada original",
    "precio": 600.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A30 Amoled",
    "precio": 450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A30 Amoled C/M",
    "precio": 480.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A30/A50 Incell",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A30 Incell C/M",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A30S Amoled",
    "precio": 450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A30S Amoled C/M",
    "precio": 480.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A30S Incell",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A30S Incell C/M",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A31 Amoled C/M",
    "precio": 480.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A31 Incell",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A31 Incell C/M",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A310/A3 2016 Incell",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A32 4G Amoled C/M",
    "precio": 500.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A32 4G Incell",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A32 4G Incell C/M",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A32 5G Ori",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A32 5G Ori C/M",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A33 4G Ori",
    "precio": 1860.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A33 4G Incell",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A33 4G Incell cm",
    "precio": 340.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A33 4G Amoled C/M P/O",
    "precio": 620.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A33 4G Amoled C/M P/P",
    "precio": 560.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A34 5G Incell",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A34 4G/5G Amoled C/M P/O",
    "precio": 790.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A34 4G/5G Amoled C/M P/P",
    "precio": 620.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A35/A55 Incell",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A35 4G Incell C/M",
    "precio": 320.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A35 4G/5G Amoled C/M P/O",
    "precio": 790.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A36 Amoled C/M P/O",
    "precio": 780.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A320/A3 2017 Incell",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A40 Incell",
    "precio": 380.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A42 Incell",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A5 2016/A510 Incell",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A5 2016/A510 Amoled",
    "precio": 530.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A5 2017/A520 Amoled",
    "precio": 530.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A5 2017/A520 Incell",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A50/A50S",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A50/A50S Amoled",
    "precio": 450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A50/A50S Amoled C/M",
    "precio": 480.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A50/A50S Incell C/M",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A51 Amoled C/M Pulgado Ori",
    "precio": 550.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A51 Amoled Pulgado Pequena",
    "precio": 450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A51 Amoled C/M Pulgado Pequena",
    "precio": 480.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A51 Incell Pulcago Ori",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A51 Incell C/M Pulcado Ori",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A51 Incell C/M Pulcado Pequena",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A52 4G Incell",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A52 4G Incell C/M",
    "precio": 260.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A52 4G Amoled C/M Pulgada Pequena",
    "precio": 540.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A52 4G Amoled Pulgada Pequena",
    "precio": 480.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A52 4G Amoled C/M Pulgada Ori",
    "precio": 630.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A52 5G Incell",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A52 5G Oled C/M Pulgada Ori",
    "precio": 630.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A52S 4G Incell",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A53 4g/5g incell",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A53 4G/5G Amoled C/M Pulgada Pequena",
    "precio": 530.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A53 4G/5G Amoled C/M Pulgada Ori",
    "precio": 690.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A54 4G Amoled C/M Pulgada Ori",
    "precio": 690.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A54 4G Amoled C/M Pulgada Pequena",
    "precio": 540.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A54 4G/5G Incell",
    "precio": 260.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A55 Incell",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A55 Incell 4G C/M",
    "precio": 320.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A55 Amoled C/M Pulgada Ori",
    "precio": 790.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A56 Amoled C/M Pulgada Ori",
    "precio": 850.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A6/A6 2018 Amoled",
    "precio": 680.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A6 Plus/A605 Amoled",
    "precio": 640.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A6 Plus/A605 Incell",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A7 2016/A710 Amoled",
    "precio": 480.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A7 2016/A710 Incell",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A7 2017/A720 Amoled",
    "precio": 480.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A7 2017/A720 Incell",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A7 2018/A750 Amoled",
    "precio": 640.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A7 2018/A750 Incell",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A70 Incell",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A70 Incell c/m",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A70 Amoled Pulgado Ori",
    "precio": 780.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A70 Amoled C/M Pulgado Ori",
    "precio": 830.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A70 Amoled Pulgado Pequena",
    "precio": 430.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A70 Amoled C/M Pulgado Pequena",
    "precio": 450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A71 Amoled C/M Pulgado Ori",
    "precio": 590.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A71 Amoled C/M Pulgado Pequena",
    "precio": 480.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A71 Incell",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A71 Incell c/m",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A72 Incell",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A72 Amoled C/M Pulgado Pequena",
    "precio": 540.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A72 Amoled C/M Pulgado Original",
    "precio": 690.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A8 2018/A530 Incell",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A8 2018/A530 Amoled",
    "precio": 790.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A8 2018/A530 Ori",
    "precio": 890.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A8 Plus/A730 Amoled",
    "precio": 690.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A8 Plus/A730 Incell",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A80 Amoled",
    "precio": 1050.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A80 Ori",
    "precio": 1900.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A90 Amoled",
    "precio": 1050.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung A920/A9 2018 Amoled",
    "precio": 630.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J110/J1 Ace AAA",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J120/J1 2016 AAA",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J2/J200 AAA",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J2 Core/J260 Ori",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J2 Pro/J250 AAA",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J2 Pro/J250 Amoled",
    "precio": 510.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J3 Prime/J327 Ori",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J3/J3 2016 Amoled",
    "precio": 500.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J3/J3 2016 AAA",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J330/J3 2017 Ori",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J4 Plus/J6 Plus ORI",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J4/J400 AAA",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J4/J400 Amoled",
    "precio": 470.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J5 Prime/G570 Ori",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J5 Pro/J530 AAA",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J5 Pro/J530 Amoled",
    "precio": 560.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J5/J5 2015 AAA",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J5/J5 2015 Amoled",
    "precio": 500.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J510/J5 2016 AAA",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J510/J5 2016 Amoled",
    "precio": 470.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J6/J600 AAA",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J6/J600 Amoled",
    "precio": 690.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J7 Neo/J701 AAA",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J7 Neo/J701 Amoled",
    "precio": 450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J7 Prime Ori",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J7 Pro/J730 AAA",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J7 Pro/J730 Amoled",
    "precio": 460.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J7/J7 2015 AAA",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J7/J7 2015 Amoled",
    "precio": 470.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J710/J7 2016 AAA",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J710/J7 2016 Amoled",
    "precio": 470.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J727 Ori",
    "precio": 260.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J737/J7 2018 Ori",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J8/J810/J8 Plus Amoled",
    "precio": 630.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung J8/J810/J9 Plus Incell",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung M10 Ori",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung M14 Ori",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung M20 Ori",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung M22 Oled C/M",
    "precio": 550.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung M23 M33",
    "precio": 390.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung M30 Incell",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung M30 Oled",
    "precio": 490.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung S6 Edge Ori",
    "precio": 840.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung S6 Edge Plus Ori",
    "precio": 1250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung S7 Amoled C/M",
    "precio": 890.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung S7 Edge Amoled C/M",
    "precio": 1450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung S8 Ori C/M",
    "precio": 1550.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung S8 Plus Ori C/M",
    "precio": 2250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung S9 Ori C/M",
    "precio": 1700.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung S9 Plus Ori C/M",
    "precio": 2250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung S10 C/M",
    "precio": 3230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung S10 Plus incell C/M",
    "precio": 780.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung S10E C/M",
    "precio": 1460.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung S20 Plus Ori C/M",
    "precio": 2800.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung S20 Fe Oled C/M",
    "precio": 680.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung S21 Plus Ori C/M",
    "precio": 2290.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Samsung S21 FE Oled C/M",
    "precio": 1450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto C",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto C Plus",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E 2020/ E7 2020",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E13",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E13 ORI C/M",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E14",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E15",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E2",
    "precio": 130.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E20",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E22",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E22 ORI C/M",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E30",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E32",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E4",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E4 Plus",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E4 EE.UU",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E40",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E5 Play C/M",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E5 Play Go",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E5 Plus",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E6 Play",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E6 Plus Ori",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E6i",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E6S",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto E7/E7 Power/E7I/E7I Power",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G 5G / ONE 5G ACE",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G 5G 2022",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G 5G 2023",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G 5G 2024",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Fast",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Pure",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Pure 2022",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Pure 2023",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Play 2021",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Play 2023",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Play 2024",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Power 2020",
    "precio": 330.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Power 2021/G10 Play",
    "precio": 290.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Power 2022",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Power 2023",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Power 2024",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Stylus 2020",
    "precio": 330.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Stylus 2021",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Stylus 2022",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Stylus 2023 4G",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Stylus 2023 5G",
    "precio": 390.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Stylus 5G",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Stylus 5G 2022",
    "precio": 430.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G Stylus 5G 2024",
    "precio": 780.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G04 Ori",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G04 Ori C/M",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G10 / G10 power",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G13/ G23 ORI",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G14/ G54 / G55 5G / ORI",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G14/ G54 ORI C/M",
    "precio": 260.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G15 ORI",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G05 ORI",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G100/Edge S",
    "precio": 340.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G200/Edge S30",
    "precio": 310.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G2 EN PROMOCION",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G20",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G20 C/M",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G22",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G22 C/M",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G23",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G24/G04 ORI",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G3 EN PROMOCION",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G30",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G32",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G34 Ori",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G4",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G4 Play",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G4 Plus",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G31/G41/G71 ORI",
    "precio": 530.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G31/G41/G71 INCELL",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G34",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G34 ORI",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G35 5G",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G42 INCELL",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G42 ORI",
    "precio": 550.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G5",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G5 Plus",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G50 4G",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G50 5G",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G51 ORI",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G52/ G72/ G82/ EDGE 30 ORI",
    "precio": 880.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G52/ G72/ G82/ EDGE 30 INCELL",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G53",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G55 5G / G14 / G54",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G5S Plus",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G6",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G6 Play/E5 ORI",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G6 Play/E5 ORI C/M",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G6 Plus",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G60 ORI",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G60 ORI C/M",
    "precio": 260.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G60 incell",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G62",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G7 Play",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G7 Plus/G7",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G7 Power",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G7 Power AMERICANO",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G73 Ori",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G75 5G",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G8",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G8 Play/ONE MARCO",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G8 Play/ONE MARCO C/M",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G8 Plus ORI",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G8 Power",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G8 Power Lite",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G8 Power Lite C/M",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G84 INCELL",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G84 ORI",
    "precio": 980.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G9 Plus",
    "precio": 260.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G9 Power",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G9/G9 Play/E7 Plus",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G9/G9 Play/E7 Plus C/M",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE C/M",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE 5G 2020 Ori",
    "precio": 450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE Fusion",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE Fusion Plus",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE Hyper",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE Vision/XT1970",
    "precio": 670.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE ZOOM/Z4 Play Ori",
    "precio": 570.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE POWER Ori",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto X4",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Z Play Amoled",
    "precio": 430.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Z2 Force Ori",
    "precio": 890.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Z2 Play Amoled",
    "precio": 430.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Z3 Play Amoled",
    "precio": 680.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge",
    "precio": 1420.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 20 / Edge 20 pro ORI",
    "precio": 820.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 20 / Edge 20 pro INCELL",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 20 LITE INCELL",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 20 LITE INCELL C/M",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 20 LITE ORI",
    "precio": 840.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 20 LITE ORI C/M",
    "precio": 880.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 30 PRO ORI",
    "precio": 910.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 30 NEO ORI",
    "precio": 1230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 30 FUSION ORI",
    "precio": 790.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 40 Neo INCELL",
    "precio": 510.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 40 Neo ORI",
    "precio": 1030.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 50 FUSION INCELL C/M",
    "precio": 570.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 50 FUSION ORI",
    "precio": 850.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 50 ORI",
    "precio": 950.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 50 Pro Ori",
    "precio": 990.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G8 Power Lite",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G8 Power Lite C/M",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G84 INCELL",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G84 ORI",
    "precio": 980.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G9 Plus",
    "precio": 260.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G9 Power",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G9/G9 Play/E7 Plus",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto G9/G9 Play/E7 Plus C/M",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE C/M",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE 5G 2020 Ori",
    "precio": 450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE Fusion",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE Fusion Plus",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE Hyper",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE Vision/XT1970",
    "precio": 670.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE ZOOM/Z4 Play Ori",
    "precio": 570.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto ONE POWER Ori",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto X4",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Z Play Amoled",
    "precio": 430.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Z2 Force Ori",
    "precio": 890.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Z2 Play Amoled",
    "precio": 430.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Z3 Play Amoled",
    "precio": 680.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge",
    "precio": 1420.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 20 / Edge 20 pro ORI",
    "precio": 820.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 20 / Edge 20 pro INCELL",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 20 LITE INCELL",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 20 LITE INCELL C/M",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 20 LITE ORI",
    "precio": 840.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 20 LITE ORI C/M",
    "precio": 880.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 30 PRO ORI",
    "precio": 910.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 30 NEO ORI",
    "precio": 1230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 30 FUSION ORI",
    "precio": 790.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 40 Neo INCELL",
    "precio": 510.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 40 Neo ORI",
    "precio": 1030.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 50 FUSION INCELL C/M",
    "precio": 570.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 50 FUSION ORI",
    "precio": 850.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 50 ORI",
    "precio": 950.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Moto Edge 50 Pro Ori",
    "precio": 990.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei G ELite Plus/P9 Lite Mini",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Gw Metal",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor 10 Lite",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor 10X Lite",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor 20 Lite",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor 50 Lite",
    "precio": 290.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor 50 ORI",
    "precio": 780.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor 70 ORI",
    "precio": 790.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor 90 ORI",
    "precio": 750.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor 8",
    "precio": 290.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor 8X",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x5 ori",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x5b ori",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x6 ori",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x6a/x5 plus ori",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x6b ori",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x7 ori",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x7a ori",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x7b ori",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor X7C",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x8 ori",
    "precio": 260.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x8 incell",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x8 5G ori",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x8a incell",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x8a ori",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x8a 5G ori",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x8b ori",
    "precio": 610.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x8C ori",
    "precio": 580.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x9 ori",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x9a/Magic 5 lite incell",
    "precio": 490.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor x9a/Magic 5 lite ori",
    "precio": 650.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Honor X9C",
    "precio": 790.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Mate 10 Lite",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Mate 10 Pro oled",
    "precio": 660.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Mate 20 oled",
    "precio": 530.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Mate 20 Lite",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Mate 20 Pro Incell",
    "precio": 400.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Mate 8",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Mate 9",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Nova 3",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Nova 5T Ori",
    "precio": 330.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Nova 5T COG",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Nova 8 ori",
    "precio": 770.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Nova 8i ORI",
    "precio": 320.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Nova 9 ori",
    "precio": 770.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Nova 9 se Cog",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Nova 9 se ori",
    "precio": 400.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Nova 10 se ori",
    "precio": 790.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Nova 11 i incell",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Nova 11I ori",
    "precio": 410.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P Smart",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P Smart 2019",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P Smart 2019 cog",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P10 Selfie",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P10 Lite",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P20",
    "precio": 390.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P20 Lite",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P20 Pro Oled c/m",
    "precio": 1180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P20 Pro TFT",
    "precio": 290.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P30 TFT",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P30 Oled",
    "precio": 690.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P30 Oled c/m",
    "precio": 900.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P30 Lite Ori",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P30 Lite Incell",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P30 Pro Amoled",
    "precio": 1120.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P30 Pro Amoled C/M",
    "precio": 1360.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P30 Pro TFT",
    "precio": 320.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P40",
    "precio": 1970.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P40 Incell",
    "precio": 520.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P40 Lite",
    "precio": 260.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P40 Pro ori",
    "precio": 3920.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P8 Lite",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P9 Lite 2017",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei P9 Lite/P9 Lite 2016",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y5 2018",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y5 2019",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y5 II/Y5 2",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y5 Prime 2020",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y5 Pro/Y5 2017",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y60",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y61",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y6 2018",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y6 2019/Y6S/Honor 8a",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y6 II/Y6 2",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y6 Prime 2020/ Honor 9a",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y7 2018",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y7 2019/Y7 Prime 2019",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y7 Prime 2020",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y7/Y7 Prime/Y7 2017",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y7A/ P SAMRT 2021",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y70",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y71",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y8 Prime 2020 TFT",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y9 2019/ Y8S COG",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y9 2019 / Y8S Ori",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y9 2019 / Y8S Ori C/M",
    "precio": 380.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y9 Prime 2019/Y9S COG",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y9 Prime 2019/Y9S/HONOR 9X Ori",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y9 Prime 2019/Y9S/HONOR 9X Ori C/M",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y9/Y9 2018",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y9A COG",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y9A",
    "precio": 290.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y9A C/M",
    "precio": 400.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Y90",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Magic 4 pro ori",
    "precio": 1270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Magic 5 pro ori",
    "precio": 1250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Huawei Magic 6 lite ori",
    "precio": 1050.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A3 2020",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A321 EN PROMOCION",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A5 2019",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A5 2020/A7 2020",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A51/A71",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A52",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A52 lite",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A53",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A54",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A55/A35",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A520 EN PROMOCION",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A521",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A530",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A6 Plus EN PROMOCION",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A602",
    "precio": 320.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A72",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A7 2019",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A7S 2019 Ori",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE A7S 2020 Ori",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE L210",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE L220",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE L8",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE L9",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE V Smart 2050",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE V Smart 1050",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE V2020 SMART （8010）/V30 VITA",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE V6 Plus",
    "precio": 320.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE V7",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE V8 EN PROMOCION",
    "precio": 290.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE V9",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE V9 Vita/V9 Lite",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE ZTE V10",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE V10 Vita",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE V2020",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE V2020 Vita",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE ZTE V30",
    "precio": 330.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE ZTE V40",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE V40 Vita",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE V40 smart",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE V41 smart",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE ZTE V50",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE ZTE V50 Vita",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE V50 Smart ori",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE ZTE V60",
    "precio": 450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE V60 Smart ori",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE Z982/ V Ultra",
    "precio": 320.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE Axon 20 ori",
    "precio": 800.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE Axon 30 5g ori",
    "precio": 1760.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE Axon 40 SE ori",
    "precio": 1220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE Axon 40 lite ori",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE Axon 50 lite ori",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa ZTE Axon 60 lite ori",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG Aristo 3/X220 Ma",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG Fortune M153",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K10 2018/ K11/ K11 PLUS/ K30",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K22/ K22 PLUS",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K4 2017/X230",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K40/K12 Plus/X420HM",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K40S",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K41",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K41S",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K42/ K52/ K62",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K50/Q60",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K50S",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K51",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K51S",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K61",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K7 2017",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K7/X210 C/M",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K8 2017/MS210/ARISTO",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K8 2017/X240",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K8 2018/ARISTO 2 Marco",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K8/K350H",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG K9 /X2 K9 2018",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG Q6/K5/X220",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG Q6/M700/Q6 Prime",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG Q7/X210 Bsy",
    "precio": 260.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG Q710/Q STYLUS ALPHA",
    "precio": 320.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa LG Stylus 6 / K71",
    "precio": 380.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Alcatel 5002A 1B",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Alcatel 5012",
    "precio": 390.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Alcatel 5024",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Alcatel 5030/ A1se ori",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Alcatel 5033",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Alcatel 5045",
    "precio": 430.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Alcatel 5046",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Alcatel 5048",
    "precio": 350.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Alcatel 5049",
    "precio": 130.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Alcatel A1S 2020/ 5028/ 5007",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Alcatel 1V 2020",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Alcatel 1V 2021",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Alcatel 1L 2021",
    "precio": 340.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Alcatel 1L Pro",
    "precio": 360.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi A1",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi A2",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi A2 lite",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi A3",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi 6/6A",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi 7",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi 7A",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi 8",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi 9",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi 9C/9A",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi 9C/9A C/M",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi 9T/ POCO M3 Ori",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi 10C",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi 10/Redmi 10 prime",
    "precio": 260.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi 12",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi 12C",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi 13",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi 13 5G",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi 13C",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi 14C",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 5",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 5A Prime",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 6 Pro/ Note 6",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 7/Note 7 Pro",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 8 TFT",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 8 Ori",
    "precio": 260.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 8T TFT",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 8 Pro",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 9",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 9 Pro/ Note 9S",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 10 4G INCELL",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 10 4G Amoled LLENO",
    "precio": 590.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 10 5G /M3 pro 5g",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 10 Pro 4G TFT",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 10 Pro 4G Amoled",
    "precio": 760.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 11 5G/ M4 pro 5g ORI",
    "precio": 260.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 11 4G/ Note 11s TFT",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 11 4G/ Note 11s Oled",
    "precio": 650.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 11E / REDMI 10 5G ORI",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 11T / Redmi Note 11T PRO / REDMI 10 5G / Poco X4 Gt / ORI",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 11 Pro 4G TFT",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 11 Pro 4G Oled",
    "precio": 690.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 11 Pro 5G TFT",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 11 Pro 5G Oled",
    "precio": 690.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 12s TFT",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 12 TFT",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 12 OLED",
    "precio": 680.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 12 PRO TFT",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 12 PRO 5G ORI",
    "precio": 610.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 12 PRO 5G TFT",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 12 PRO 4G Oled",
    "precio": 670.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 13 4G TFT",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 13 4G OLED",
    "precio": 710.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 13 5G TFT",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 13 5G ORI",
    "precio": 610.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 13 PRO TFT",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 13 PRO ORI",
    "precio": 1870.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 14 Incell",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Redmi Redmi Note 14 4G OLED",
    "precio": 710.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 3",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 5 EN PROMOCION",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 8 Amoled",
    "precio": 450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 8 Lite",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 9 TFT",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 9T Amoled",
    "precio": 820.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 9T TFT",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 9 Lite TFT",
    "precio": 350.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 10T/ Mi 10T PRO 5G/ K30S",
    "precio": 450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 10 LITE Ori",
    "precio": 630.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 11T TFT",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 11 LITE TFT",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 11 LITE Ori",
    "precio": 750.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 11T Ori",
    "precio": 890.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 12 ORI",
    "precio": 1650.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 12 LITE ORI",
    "precio": 770.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 12T / MI 12T PRO TFT",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi 12T / MI 12T PRO OLED",
    "precio": 860.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi A1",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi A2",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi A3 Amoled",
    "precio": 660.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Mi A3 TFT",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Note 10 Lite/Note 10 ORI",
    "precio": 1000.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Poco X3/ X3 PRO/ MI10T LITE 4G",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Poco X3 gt",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Poco X4 pro",
    "precio": 260.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Poco X4 gt",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Poco C40",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Poco F3 TFT",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Poco F3 OLED",
    "precio": 790.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Poco F5",
    "precio": 340.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Poco X6 TFT",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Poco X6 Pro TFT",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Poco X6 OELD",
    "precio": 670.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi Poco X6 Pro OELD",
    "precio": 850.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi K40 TFT",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Xiaomi K40 Gaming Oled",
    "precio": 680.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A12",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A15/ C15",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A16",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A17/ A57 4G/ A77",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A18",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A31",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A38 4G Ori",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A40 ORI",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A52 4G",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A53 4G/ N100/ C17",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A53 5G",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A54 4G",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A54 5G",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A56",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A58 4G",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A58 5G",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A72 4G",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A74 4G TFT",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A78 4G",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A78 5G",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A79",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A83",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A9",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A9 2020",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A93 4G/ RENO 4/RENO 4 LITE TFT",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A93 4G/ RENO 4/RENO 4 LITE Oled",
    "precio": 1100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A93 5G Ori",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A94 4G Oled",
    "precio": 790.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO A98",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 5 Lite TFT",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 5 Lite OLED",
    "precio": 790.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 6 5G TFT",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 6 5G OLED",
    "precio": 860.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 6 Lite TFT",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 6 Lite OLED",
    "precio": 790.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 7 Lite TFT",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 7 Lite OLED",
    "precio": 820.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 7 4g TFT",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 7 4g OLED",
    "precio": 890.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 7 5g TFT",
    "precio": 290.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 7 5g OLED",
    "precio": 790.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 10 5g Original",
    "precio": 830.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 11 5g Original",
    "precio": 850.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 12F TFT",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 12F OLED",
    "precio": 720.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 13 Oled CPH2689",
    "precio": 1370.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Reno 13 Incell CPH2689",
    "precio": 770.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Realme 7",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Realme 7i",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Realme 7 5g",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Realme 7 PRO TFT",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Realme 8 5G ORI",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Realme 8 PRO TFT",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Realme 8 PRO OLED",
    "precio": 800.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Realme 8i /Realme 9i",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Realme C11 2020",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Realme C11 2021/ C20/C21",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Realme C21y /C25y",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Realme C35",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Realme C53",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Realme C55",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Realme C65",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO Realme C67",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OPPO F9/ F9 pro",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OnePlus N100",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OnePlus N200",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa OnePlus N10 5g",
    "precio": 350.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO Y01 / Y02S",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO Y03",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO Y04",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO Y11S/ Y20",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO Y15s",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO Y17",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO Y17s",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO Y18",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO Y21S",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO Y22/Y22S",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO Y28",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO Y35",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO Y36",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO Y33 / Y33s",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO Y53 / Y53S",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO Y31 / Y51",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO V21 TFT",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO V21 OLED",
    "precio": 630.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO V25 TFT",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO V25 OLED",
    "precio": 630.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO V25E/V27E TFT",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO V25E/V27E OLED",
    "precio": 780.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa VIVO VIVO V30 Lite",
    "precio": 260.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa WIKO WIKO T3 ORI",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa WIKO WIKO T10 ORI",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa WIKO WIKO T50 ORI",
    "precio": 380.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Hisense H30 lite/ E40 lite",
    "precio": 240.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Hisense H40 lite/ E40/ V40",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Hisense H50",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Hisense H50 lite/ E50",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Hisense H60 / H50",
    "precio": 310.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Hisense HISENSE E20",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Hisense E50 Lite",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Hisense E50I",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Hisense H60 Lite/ H60 Smart/ V60",
    "precio": 320.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Hisense E60",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Hisense E60 Lite",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Hisense V40S",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Hisense V40I",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Hisense V50",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Hisense U50 4g",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Tcl 10 L",
    "precio": 290.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Tcl 10 5G",
    "precio": 500.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Tcl 10 SE",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Tcl 20 L",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Tcl 20 E",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Tcl 20 SE",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Tcl 20 XE",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Tcl 30 XE",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Completa Tcl 30 SE",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone 5 SE CONDICION 100%",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone 5G CONDICION 100%",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone 5S/5C CONDICION 100%",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone 6G CONDICION 100%",
    "precio": 70.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone 6P CONDICION 100%",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone 6S CONDICION 100%",
    "precio": 90.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone 6S Plus CONDICION 100%",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone 7 Plus CONDICION 100%",
    "precio": 130.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone 7G CONDICION 100%",
    "precio": 110.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone 8 Plus CONDICION 100%",
    "precio": 130.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone 8G CONDICION 100%",
    "precio": 110.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone SE2 CONDICION 100%",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone X CONDICION 100%",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone XR CONDICION 100%",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone XS CONDICION 100%",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone Xs max CONDICION 100%",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 11 CONDICION 100%",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 11 Pro CONDICION 100%",
    "precio": 210.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 11 Pro Max CONDICION 100%",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 12 CONDICION 100%",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 12 Mini CONDICION 100%",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 12 Pro CONDICION 100%",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 12 Pro Max CONDICION 100%",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 13 CONDICION 100%",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 13 Mini CONDICION 100%",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 13 Pro CONDICION 100%",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 13 Pro Max CONDICION 100%",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 14 CONDICION 100%",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 14 Pro CONDICION 100%",
    "precio": 270.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 14 Pro Max CONDICION 100%",
    "precio": 350.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 15 CONDICION 100%",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 15 PRO CONDICION 100%",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 15 PRO MAX CONDICION 100%",
    "precio": 380.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 11 sin flexor PROMOCION",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 11 pro sin flexor PROMOCION",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 11 pro max sin flexor PROMOCION",
    "precio": 90.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 12 sin flexor PROMOCION",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 12 pro sin flexor PROMOCION",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 12 pro max sin flexor PROMOCION",
    "precio": 120.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 13 sin flexor PROMOCION",
    "precio": 90.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 13 pro sin flexor PROMOCION",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 13 pro max sin flexor PROMOCION",
    "precio": 130.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 14 sin flexor PROMOCION",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 14 pro sin flexor PROMOCION",
    "precio": 120.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 14 pro max sin flexor PROMOCION",
    "precio": 130.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 11 pro PROMOCION",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 11 pro max PROMOCION",
    "precio": 120.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 12 PROMOCION",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 12 pro PROMOCION",
    "precio": 120.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 12 pro max PROMOCION",
    "precio": 130.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 13 PROMOCION",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 13 pro PROMOCION",
    "precio": 120.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 13 pro max PROMOCION",
    "precio": 130.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 14 PROMOCION",
    "precio": 120.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 14 pro PROMOCION",
    "precio": 130.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria iPhone iPhone 14 pro max PROMOCION",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Mate 10 Lite/HB356687ECW",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Mate 20 Lite/Nova 3/Nova 5T",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Mate 10",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Mate 20",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Mate 9/HB396689ECW",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei honor 7x",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei honor 20",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei honor 8a",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei honor 9x",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei P10 selfie/ P30 lite",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei P20 Lite/P9/P9 lite / P10 lite",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei P20",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei P20 pro",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Honor 10 lite",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei P30 lite/mate 10 lite/honor 7X /p10selfie",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei P8 Lite/HB3742AOEZC+",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei P9 lite 2017",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei P9/P9 Lite/P10 Lite/HB366481ECW",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Y5 2017",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Y5 2018",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Y5 2019",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Y6 2018/ P20 lite",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Y6 2019/Y6S",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Y7 2018/HB366481ECW /P20 lite",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Y7 2019",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Y8s",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei G8/GR5",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Y9 2019 /Y7 prime",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Y9 2018",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei P smart",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei P Smart 2019/ Honor 10 lite/Y9S/Y7A/8X",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Nova 3",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Y9 prime 2019/Y9S/Psmart 2019/8X",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Honor X6 /X6s /X5 /X7 / X8 5G",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Honor X7A",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Huawei Y60/Honor 9A/Honor Play 9a/Enjoy 10E",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto BL270 /G6 Play/E5/",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto GK40 /E4/G4 Play/G5/",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto GL40 /Z Play/",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto HE50 /E4 Plus/",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto HE50 /E5 Plus /E4 Plus",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto HG30 /G6/G5S Plus/",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto HZ40 /Z2 Play/",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto JE30 /E5 Play/",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto JE40 /G7 play /One / Z3",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto JG30 /G7 /",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto JG40 /G7",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto JG40 /G7 plus",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto JK50 / G power 2021",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto JK50 / G7 POWER/",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto JK50 /G Power 2022 /G play 2023",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto JK50 /G9 / G9 Play /G power 2021",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto JK50/ G31/G51/G9/G9 Play/G50 4G",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto JK50/ G7 power/G9play/E7plus/E7ipower",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto JK50/ G8 power lite/G10/G20/G30/E40",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto JK50/ one funsion/Gpower/E7power",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto JS40 /Z3 Play / Z2 Force",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto JT40 /G6 Plus/",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto KC40 /E6 plus /",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto KD40 / G8 plus",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto KG40 / G8 play/ One Marco",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto KP50 /One Zoom",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto KR40 /One Vision/ One Action",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto KS40 /E6 play /E6i /E6s",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto KZ50 /G8 power",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto LG50 / One Fusion Plus",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto MB40 / Edge 20/",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto MB50/ G200 5G/Edge S30",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto MC50/ G60/G51 5G/G40/",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto MG50 / G9 Plus",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto MK50 / G 5G/",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto MK50 /one fusion plus",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto MS50 / G50 5G/",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto NC50 /G41 /G32",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto NE50 /G82 /G52",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto NH40  /E22 /E22i /E22s",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto NH50 /E13/E32/G22/E32s/G13/G23/G53",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto NT40 / G pure / E20 /",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto NT50/Edge 20 lite/ Edge 20 fusion",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto NG50/G62 /G71 5G/",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Moto QF50/G04 / G24/ G34 5G/",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung G530 2500mah",
    "precio": 70.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung J4 PLUS / J4 CORE",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung J5 2016",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung J6 plus",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung J7 / J700 /J701 /J4 /J400",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung J7 Prime",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung J737",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A01",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A02s /A03S /A03 /A04 /A03 CORE",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A03s",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A10",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A02/ A12 / A21S /A13 4G /A14 4G",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A05 / WT-S-N28/",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A05s /A057",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A12 /A02 / A21S /A13 4G /A14 4G",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A13 4G/A21S /A02/A12 /A14 4G",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A20/ A30/ A50",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A21",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A21s/A04S /A02 /A12 /A14 4G/A13 4G/",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A10S Original",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A20S Original",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A30S/A50s/",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A22",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A31",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A32",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A33 / A53",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A51",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A52 Sm-A525/S20 Fe/S20 Fe 5G",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A53 Sm-A536E/ A33",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A70",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A71",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung A7 2018",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung J8/J810/J9 Plus",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung S6 EGDE",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung S6 EGDE PLUS",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung S7",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung S7 EDGE",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung S8",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung S8 Plus",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung S9",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung S9 Plus",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung S10",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung S10 Plus",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung S20 ULTRA",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung S20",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung S20 FE /S20 FE 5G/ A52",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung S21 ULTRA",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung S22",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung S22 ULTRA",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung Note9",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung Note8",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung NOTE 20",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria Samsung NOTE 20 ULTRA",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria MI / redmi BN5F /Redmi 10C /10prime/A2 /K40 5g",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria MI / redmi BN57 /Poco X3 /X3 pro",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria MI / redmi BN5D / NOTE 11S",
    "precio": 260.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria MI / redmi BN46 /Note 8 /note 8T/redmi7 /note6",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria MI / redmi BN53/note 9pro/note 9s/note 10pro",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria MI / redmi BN62 /Redmi 9T /Poco M3",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria MI / redmi BN56 /redmi 9a / 9c /10A",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria MI / redmi BN54 /redmi note9/redmi9/ M2/ 9 prime",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria MI / redmi BN59 /note10/note10s/note10pro/M5s",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria MI / redmi BN5E / Poco X4 5G / Note 11 Pro/",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria MI / redmi BN5Q / Redmi 13C / Poco C65 /",
    "precio": 230.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria MI / redmi BN55 / Redmi Note 9S /",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria MI / redmi BN5M Redmi Note 12 4G*5G",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria zte A51 /A5 2020 /V10 /V10 vita/V9/V9vita",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria zte a71/A7s 2020 /A7 2020",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria zte zte v10 vita",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria zte a5 2020",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria zte V20 Smart/V30 vita/A52/V2020 smart",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria zte V40 smart",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria zte Axon 50 lite",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria OPPO BLP923 /A97 5G",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria OPPO BLP923 /A57 4G/A78 5G/C51/A77 5G/",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria OPPO BLP835 / Reno 5 lite /A94 4G",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria OPPO BLP835 /F19 pro /Reno 6 4G",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria OPPO BLP851 / A74 / Reno 6 lite",
    "precio": 220.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria OPPO BLP817 / A15/A15s/A16k",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria OPPO BLP805 / A16/ A53/ A54/ A32/ A93",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria OPPO BLP915 / A57(5G) / A17 / A17K / A58X",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria OPPO BLP907 / Reno 7 4G / A96 4G / Reno 7 lite/",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria VIVO B-O5 /Y20s/Y12s/Y20/Y11s/Y20i",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria VIVO B-S7 / Y01 / Y15s / Y10 /",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria VIVO B-Q8 / Y53s /",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria VIVO B-W1 / Y02 / Y02s / Y16 / Y35 5G/ Y16",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Bateria VIVO B-W3 / Y22 / Y22s / Y35 5G /",
    "precio": 190.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Alcatel 4033",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Alcatel 4047",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Alcatel 5010",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Alcatel 5012",
    "precio": 130.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Alcatel 5015",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Alcatel 5024",
    "precio": 130.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Alcatel 5025",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Alcatel 5026",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Alcatel 5033",
    "precio": 130.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Alcatel 8050",
    "precio": 120.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch iPad iPad 2",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch iPad iPad 3",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch iPad iPad 4",
    "precio": 160.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch iPad iPad 6 2018",
    "precio": 320.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch iPad iPad Air/iPad 5",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch iPad iPad Air 2/ iPad 6",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch iPad iPad Mini",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch iPad iPad Mini 2",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch iPad iPad Mini 3",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch iPad iPad Mini 4",
    "precio": 360.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch iPad iPad 7",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch iPad iPad Pro 9.7\"",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Lanix X210",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Lanix X220",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Lanix X230",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Lanix X500",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Lanix X510",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Lanix X520",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Lanix X530",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Lanix X540",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Lanix X710",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Lenovo A2016",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch LG G3 Stylus",
    "precio": 130.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch LG L70",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch LG L7X",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch LG L80 BELLO",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch LG L80 HOME",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch LG L9",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch LG L90 HOME",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch LG Q6",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch LG X165",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Moto E5 Play Go",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Moto Moto C",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Moto Moto C Plus",
    "precio": 90.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Samsung G313/ ACE 4",
    "precio": 70.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Samsung G318",
    "precio": 70.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Samsung G350",
    "precio": 70.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Samsung G355",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Samsung G360",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Samsung G530/G531/Grand Prime",
    "precio": 40.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Samsung G532/J2 Prime",
    "precio": 40.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Samsung G550",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Samsung i9060 Neo",
    "precio": 70.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Samsung i9082",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Samsung J1",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch Samsung J1 Mini",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch ZTE L2 Plus",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch ZTE L7",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch ZTE L7A",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Touch ZTE L8",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Alcatel 4047",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Alcatel 5010",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Alcatel 5015",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Alcatel 5033",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Alcatel 8050",
    "precio": 350.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Lanix X510",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Lanix X520",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Lanix X530",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Samsung G313/ACE 4 Versoin F",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Samsung G316F",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Samsung G316ML",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Samsung G318",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Samsung G355/Core 2",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Samsung G360/ Core Prime/G361",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Samsung G530/G531/G532/J2 Prime",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Samsung G550/ON5",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Samsung i9060",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Samsung J1 Mini/J105",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Samsung J1/J100",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD Samsung ON7",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD ZTE L2 Plus",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD ZTE L5",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD ZTE L7",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Solo LCD ZTE L7A",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex camara frontal iPhone 5C",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex camara frontal iPhone 5G",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex camara frontal iPhone 6G ORIGINAL",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex camara frontal iPhone 6 PLUS ORIGINAL",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex camara frontal iPhone 6 S ORIGINAL",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex camara frontal iPhone 6 S PLUS ORIGINAL",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex camara frontal iPhone 7 Plus ORIGINAL",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex camara frontal iPhone 7G ORIGINAL",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex camara frontal iPhone 8 Plus ORIGINAL",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex camara frontal iPhone 8G ORIGINAL",
    "precio": 280.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex camara frontal iPhone X ORIGINAL",
    "precio": 450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex camara frontal iPhone XS ORIGINAL",
    "precio": 450.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex camara frontal iPhone XS MAX ORIGINAL",
    "precio": 500.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Marco Bisel Moto G6 Play / E5",
    "precio": 200.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Marco Bisel Samsung Note 10 Plus",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Marco Bisel Samsung Note 10",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Marco Bisel Samsung G531",
    "precio": 70.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Marco Bisel Samsung G532",
    "precio": 70.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Marco Bisel Samsung J4",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Marco Bisel Samsung J7",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone 5g",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone 5s",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone 5se",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone 6g",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone 6s",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone 6plus",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone 6s plus",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone 7g",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone 7plus",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone 8g",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone 8plus",
    "precio": 100.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone X",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone Xs",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone Xs max",
    "precio": 170.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone Xr",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone 11",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone 11 pro sin ic",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone 11 pro con ic",
    "precio": 650.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone 11 pro max sin ic",
    "precio": 300.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de iPhone 11 pro max con ic",
    "precio": 650.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A01",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A02",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A02s",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A10",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A10s m15/m16",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A11",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A12",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A20",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A20s m12/m14",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A21",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A21s",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A22 4g",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A22 5g",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A30",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A31",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A32 4g /a325",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A32 5g/a326",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A50",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A51",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A52",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A70",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A71",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A80",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A750/a7 2018",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung A920/a9 2018",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung S7",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung S7 edge",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung S8",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung S8 plus",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung S9",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung S9 plus",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung S10",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung Note 10",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de samsung Note 10 lite",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de moto E4",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de moto E5/G6play",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de moto E5 plus",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de moto E6 play",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de moto E6 plus",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de moto E6s",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de moto E6i",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de moto E7",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de moto E7plus",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de moto E7i power",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de moto E7 power",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de moto G3",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de moto G5",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "tablilla de huawei P smart",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "tablilla de huawei P smart 2019",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de zte V smart",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de zte V10",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de zte V 10 vita",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de zte V ultra",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de zte V6",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de zte V8",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de zte A5 2020",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de zte A7s 2020",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de zte A3 2020",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de zte A51",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de zte A71",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de sony Xa",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de sony Xa 1 ultra",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de sony L1",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de xiaomi Redmi 9",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de xiaomi Redmi 9c/9a",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de xiaomi Redmi 9t",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de xiaomi Redmi 9 pro",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de xiaomi Note 8",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de xiaomi Note 8 pro",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de xiaomi Note 9",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de xiaomi Note 9 pro",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de xiaomi Note 10",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de xiaomi Note 10 pro/note 10s",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de LG k52",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de LG Q STYLUS ALPHA",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de LG Q7 plus",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de LG K42",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de LG G6",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tablilla de LG K71",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de samsung A10",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de samsung A10s",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de samsung A20",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de samsung A20s",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de samsung A21s",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de samsung A51",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de samsung J4 plus",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de samsung A12",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto E4",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto E4 plus",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto E5/g6 play",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto E6 play",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto E6 plus",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto E7plus",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto G5",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto G6",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto G6 plus",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto G7 plus",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto G7 play",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto G7power",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto G8",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto G8 plus",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto G8 play",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto G8 power lite",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto G9 play",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto G9 plus",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto G9 power",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto One",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto One hiper",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto One fusion",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto One fusion plus",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto G20",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto G30",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de moto G100",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de huawei Y6-2018",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de huawei Y6-2019",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de huawei Y7-2018",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de huawei Y9-2019",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de huawei Y9 prime",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de huawei Y9s",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de huawei P20 lite",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de huawei P30 lite",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de huawei Nova 3",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de huawei Nova 5t",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de huawei Mate 20 lite",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de huawei P smart",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de huawei P smart 2019",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de huawei P 10 selfei",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de zte V ultra/z982",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de zte V10",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de zte V10vita",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de zte A3 2020",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de zte A5 2020",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Flex de zte V smart",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de camara",
    "precio": 0.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone 6G",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone 6s",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone 6plus",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone 6s plus",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone 7g",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone 7plus",
    "precio": 70.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone 8g",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone 8plus",
    "precio": 70.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone X",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone Xs",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone Xs max",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone Xr",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone 11",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone 11 pro",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone 11 pro max",
    "precio": 120.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone 12",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone 12 pro",
    "precio": 120.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone 12 pro max",
    "precio": 120.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone 13",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone 13 pro",
    "precio": 120.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de iphone 13 pro max",
    "precio": 120.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung A10",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung A20/a30",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung A50",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung A11",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung A12",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung A02",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung A70",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung A21s",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung A30s",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung A51",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung A80",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung Note 10",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung S8 plus",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung A20s",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung A02s",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung J4 plus",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung G530",
    "precio": 30.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung J700",
    "precio": 30.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung A6 plus",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de samsung J6 plus",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de moto G6 play",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de moto G20",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de moto G30",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de moto G100",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de moto G9 plus",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de moto G9 power",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de moto G7 play",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de moto G7",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de moto G7 plus",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de moto G8 plus chico",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de moto G8 plus largo",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de moto G8 power lite largo",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de moto One fusion plus largo",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de moto One",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de moto G8 play",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de moto Z2 play",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de moto Z3 play",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de huawei Y8s",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de huawei Y9-2019",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de huawei Y9 prime",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de huawei Y9s",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de huawei Mate 20 lite",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de huawei P30 lite",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de huawei Nova 3",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de huawei Nova 5t",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de huawei Y6-2019",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Cristal de huawei P20 lite",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone 8g tapa sola",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone 8g carcasa completo",
    "precio": 250.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone 8 plus tapa sola",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone 8plus carcasa completa",
    "precio": 350.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone X tapa sola",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone X carcasa completa",
    "precio": 400.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone Xs tapa sola",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone Xs carcasa completa",
    "precio": 400.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone Xs max tapa sola",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone Xs max carcasa cpmpleta",
    "precio": 500.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone XR tapa sola",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone XR carcasa completa",
    "precio": 400.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone 11 tapa sola",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone 11 pro max tapa sola",
    "precio": 120.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone 12 tapa sola",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone 12 pro tapa sola",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone 12 pro max tapa sola",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone 13 tapa sola",
    "precio": 130.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone 13 pro tapa sola",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone 13 pro max tapa sola",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone 14 tapa sola",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone 14 pro tapa sola",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de iphone 14 pro max tapa sola",
    "precio": 180.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung G530",
    "precio": 50.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung S6 edge",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung S7",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung S7 edge",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung S8",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung S8 plus",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung S9",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung S9 plus",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung S10 plus",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung Note 10",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung Note 10 plus",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung A11",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung A20",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung A30",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung A50",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung A80",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung A51",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung A920",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung S20 plus",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de samsung Note 20 ultra",
    "precio": 150.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de moto One",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de moto One zoom",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de moto One vision",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de moto G6 play",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de moto G6",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de moto G6 plus",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de moto G7",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de moto G7 plus",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de moto G9 play",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de moto G9 power",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de moto X4",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de moto G7 power",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de huawei P20 lite",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de huawei P30 lite",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de huawei P40 lite",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de huawei Nova 3",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de huawei Nova 5t",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de huawei Y9-2019",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de huawei Y9 prime",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de huawei Y9s",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  },
  {
    "modelo": "Tapa de huawei Horno 10 lit",
    "precio": 80.00,
    "distribuidor": "XMovil",
    "precioespecial": 0
  }
]


  // productos.forEach(x => {
    
  //  this.proveedoresService.createProveedor({modelo:x.modelo, precio:x.precio, distribuidor: x.distribuidor, precioespecial:x.precioespecial }).subscribe({
  //    next: () => {
    //    this.exito = true;
      //  this.productoForm.reset();
      //  this.enviado = false;
      //  setTimeout(() => this.router.navigate(['/mostrar-productos']), 1200);
     // },
    //  error: () => {
      //  this.error = 'Error al crear el producto';
       // this.enviado = false;
     // }
   // });
  //})  

    const proveedoresExistentes = await this.proveedoresService.getProveedores().toPromise();
  
  for (const x of productos) {
    const existe = proveedoresExistentes?.find(proveedor => 
      proveedor.modelo.toLowerCase() === x.modelo.toLowerCase()
    );
    
    if (existe) {
      //console.log('Sí', `El modelo ${x.modelo} ya existe`);
    } else {
      console.log('No', `El modelo ${x.modelo} no se encontró`, x);
      
        try {
        await this.proveedoresService.createProveedor({
          modelo: x.modelo, 
          precio: x.precio, 
          distribuidor: x.distribuidor, 
          precioespecial: x.precioespecial 
        }).toPromise();
        
        console.log(`Producto ${x.modelo} creado exitosamente`);
        this.exito = true;
      } catch (error) {
        console.error(`Error al crear ${x.modelo}:`, error);
        this.error = `Error al crear el producto ${x.modelo}`;
      }  
    }
  }

} 
  */
 


}
