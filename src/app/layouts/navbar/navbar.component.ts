import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass, RouterLinkActive, RouterOutlet
  ],
  template: `
  <header>
<nav>
  <button><img src="logo.png" alt="Logo del sise" /></button>

  <button routerLink="/dashboard" routerLinkActive="activo" [routerLinkActiveOptions]="{ exact: true }">
    <i class="bi bi-speedometer2"></i> Dashboard
  </button>

  <button routerLink="/semaforos" routerLinkActive="activo">
    <i class="pi bi-stoplights"></i>Mantenimiento Semaforos
  </button>

  <button routerLink="/redes" routerLinkActive="activo">
    <i class="bi bi-people"></i> Mantenimiento Redes
  </button>

  <!-- Ciudadanos -->
  <div
    class="ciudadanos-sub"
    [ngClass]="{ 'active': isCiudadanosActive }"
  >
    <button (click)="toggleCiudadanos()" >
      <i class="bi bi-person-bounding-box"></i> Miembros
    </button>
      <button routerLink="/ciudadanos" routerLinkActive="activo">
        <i class="bi bi-dot"></i> Dashboard Miembros
      </button>
      <button routerLink="/mantenimiento-ciudadanos"  routerLinkActive="activo">
        <i class="bi bi-dot"></i> M. Miembros
      </button>
  </div>

  <button routerLink="/tareas" routerLinkActive="activo">
    <i class="bi bi-list-check"></i> Mantenimiento Tareas
  </button>
  <button>
    <i class="bi bi-chat-left-dots"></i> Mantenimiento Novedades
  </button>
  <button>
    <i class="bi bi-geo-alt"></i> Mapa
  </button>
  <button routerLink="/usuarios" routerLinkActive="activo" class="btn-gestores">
   <i class="bi bi-person-badge"></i>Mantenimiento Usuarios
  </button>
</nav>
<section class="contenido">
<router-outlet></router-outlet>
</section>
</header>

  `,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  rutaActual: string = '';
  isCiudadanosActive = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.rutaActual = this.router.url; // Ejemplo: /home, /login, etc.
    if (this.rutaActual === '/ciudadanos' || this.rutaActual === '/mantenimiento-ciudadanos') {
      this.isCiudadanosActive = true;
    }
  }

  toggleCiudadanos() {
    // Si ya está activo, lo colapsamos manualmente. Si no, lo abrimos.
    this.isCiudadanosActive = !this.isCiudadanosActive;
  }


    

}
