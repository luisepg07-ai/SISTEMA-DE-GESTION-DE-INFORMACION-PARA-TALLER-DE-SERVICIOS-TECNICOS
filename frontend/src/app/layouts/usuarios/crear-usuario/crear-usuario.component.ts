import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService, Usuario } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {
  formulario: FormGroup;
  cargando = false;
  mensaje = '';
  tipoMensaje: 'exito' | 'error' = 'exito';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      admin: [false]
    });
  }

  crearUsuario() {
    if (this.formulario.invalid) {
      this.mostrarMensaje('Por favor completa todos los campos correctamente', 'error');
      return;
    }

    this.cargando = true;
    const nuevoUsuario: Usuario = {
      nombre: this.formulario.get('nombre')?.value,
      contraseña: this.formulario.get('contraseña')?.value,
      permisos: this.formulario.get('admin')?.value ? { admin: true } : undefined
    };

    this.usuarioService.createUsuario(nuevoUsuario).subscribe({
      next: (usuario) => {
        this.mostrarMensaje('Usuario creado exitosamente', 'exito');
        this.formulario.reset();
        this.cargando = false;
      },
      error: (error) => {
        this.mostrarMensaje('Error al crear el usuario: ' + error.message, 'error');
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
