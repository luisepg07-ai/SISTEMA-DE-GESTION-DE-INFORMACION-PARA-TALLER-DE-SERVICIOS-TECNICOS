import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioSeleccionadoService } from '../../../services/usuario-seleccionado.service';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit, OnDestroy {
  formulario: FormGroup;
  cargando = false;
  mensaje = '';
  tipoMensaje: 'exito' | 'error' = 'exito';
  usuarioId?: string;

  private sub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private usuarioSeleccionadoService: UsuarioSeleccionadoService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      contraseña: ['', [Validators.minLength(6)]],
      admin: [false]
    });
  }

  ngOnInit() {
    this.sub = this.usuarioSeleccionadoService.usuarioSeleccionado$.subscribe(usuario => {
      if (usuario) {
        this.usuarioId = usuario._id;
        this.formulario.patchValue({
          nombre: usuario.nombre,
          contraseña: '',
          admin: usuario.permisos?.admin ?? false
        });
      } else {
        this.router.navigate(['/mostrar-usuarios']);
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  guardarCambios() {
    if (this.formulario.invalid) {
      this.mostrarMensaje('Por favor completa los campos correctamente', 'error');
      return;
    }

    if (!this.usuarioId) {
      this.mostrarMensaje('No se encontró el ID del usuario', 'error');
      return;
    }

    this.cargando = true;

    const cambios: any = {
      nombre: this.formulario.get('nombre')?.value,
      permisos: { admin: this.formulario.get('admin')?.value }
    };

    const contraseña = this.formulario.get('contraseña')?.value;
    if (contraseña) {
      cambios['contraseña'] = contraseña;
    }

    this.usuarioService.updateUsuario(this.usuarioId, cambios).subscribe({
      next: () => {
        this.mostrarMensaje('Usuario actualizado exitosamente', 'exito');
        this.cargando = false;
        setTimeout(() => this.router.navigate(['/mostrar-usuarios']), 1500);
      },
      error: (error) => {
        this.mostrarMensaje('Error al actualizar el usuario: ' + error.message, 'error');
        this.cargando = false;
      }
    });
  }

  private mostrarMensaje(texto: string, tipo: 'exito' | 'error') {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
    setTimeout(() => this.mensaje = '', 4000);
  }
}
