import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemporizadorService } from './services/temporizador.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  temporizador() {
    setInterval(() => {
      this.temporizadorService.temporizador().subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
        },
        error => {
          console.error('Error en el servidor:', error);
        }
      );
    }, 1000 * 899);
  }

  constructor(private temporizadorService: TemporizadorService) { }

  ngOnInit(): void {
    this.temporizador();
  }

}
