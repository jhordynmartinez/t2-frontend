import { Component } from '@angular/core';
// Importaciones de Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
// Importaciones de Router
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-component',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './layout-component.html',
  styleUrls: ['./layout-component.css']
})
export class LayoutComponent {

}