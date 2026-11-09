import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioService, Usuario } from '../../../services/usuario.service';
import { UsuarioSeleccionadoService } from '../../../services/usuario-seleccionado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mostrar-usuarios.component.html',
  styleUrl: './mostrar-usuarios.component.css'
})
export class MostrarUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  cargando = false;
  busqueda = '';
  mensaje = '';
  tipoMensaje: 'exito' | 'error' = 'exito';

  mostrarConfirmacion = false;
  usuarioAEliminar?: string;

  constructor(
    private usuarioService: UsuarioService,
    private usuarioSeleccionadoService: UsuarioSeleccionadoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.usuariosFiltrados = usuarios;
        this.cargando = false;
      },
      error: (error) => {
        this.mostrarMensaje('Error al cargar los usuarios: ' + error.message, 'error');
        this.cargando = false;
      }
    });
  }

  buscarUsuarios() {
    if (!this.busqueda.trim()) {
      this.usuariosFiltrados = this.usuarios;
      return;
    }

    this.cargando = true;
    this.usuarioService.getUsuarios(this.busqueda).subscribe({
      next: (usuarios) => {
        this.usuariosFiltrados = usuarios;
        this.cargando = false;
      },
      error: (error) => {
        this.mostrarMensaje('Error en la búsqueda: ' + error.message, 'error');
        this.cargando = false;
      }
    });
  }

  seleccionarUsuario(usuario: Usuario) {
    this.usuarioSeleccionadoService.setUsuario(usuario);
    this.router.navigate(['/editar-usuario', usuario._id]);
  }

  eliminarUsuario(id: string | undefined) {
    if (!id) {
      this.mostrarMensaje('ID de usuario no válido', 'error');
      return;
    }

    this.usuarioAEliminar = id;
    this.mostrarConfirmacion = true;
  }

  confirmarEliminacion() {
    if (!this.usuarioAEliminar) return;

    this.usuarioService.deleteUsuario(this.usuarioAEliminar).subscribe({
      next: () => {
        this.mostrarMensaje('Usuario eliminado exitosamente', 'exito');
        this.cargarUsuarios();
      },
      error: (error) => {
        this.mostrarMensaje('Error al eliminar el usuario: ' + error.message, 'error');
      }
    });

    this.mostrarConfirmacion = false;
    this.usuarioAEliminar = undefined;
  }

  cancelarEliminacion() {
    this.mostrarConfirmacion = false;
    this.usuarioAEliminar = undefined;
  }

  private mostrarMensaje(texto: string, tipo: 'exito' | 'error') {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
    setTimeout(() => this.mensaje = '', 4000);
  }
}
