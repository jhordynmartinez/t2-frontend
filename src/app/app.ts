import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Asegúrate de que esta ruta de importación sea la correcta para tu LayoutComponent
import { LayoutComponent } from './pages/layout-component/layout-component';

@Component({
  selector: 'app-root',
  standalone: true,
  // IMPORTANTE: Asegúrate de que LayoutComponent está aquí
  imports: [
    LayoutComponent, 
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'appointmentapp-frontend';
}