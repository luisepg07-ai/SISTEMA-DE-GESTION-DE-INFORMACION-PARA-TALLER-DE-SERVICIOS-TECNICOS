import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  error: string | null = null;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      contraseña: ['', Validators.required]
    });
  }

  login() {
    if (this.form.invalid) return;
    this.cargando = true;
    this.error = null;
    const { nombre, contraseña } = this.form.value;
    this.authService.login(nombre, contraseña).subscribe({
      next: (res) => {
        this.authService.guardarToken(res.access_token);
        const decodedToken = this.authService.decodificarToken(res.access_token);
        console.log('Token decodificado:', decodedToken);
        this.cargando = false;
        this.router.navigate(['/mostrar-registros']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error de autenticación';
        this.cargando = false;
      }
    });
  }
}
