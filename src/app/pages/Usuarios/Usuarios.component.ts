import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-usuarios',
  imports: [FloatLabel,FormsModule, InputText],
  template: `
  
  <section class="contenedor buscar">
    <p-floatlabel variant="on">
        <input pInputText id="nombre" [(ngModel)]="filtroNombre" autocomplete="off" />
        <label for="nombre">DNI</label>
    </p-floatlabel>
    <p-floatlabel variant="on">
        <input pInputText id="nombre" [(ngModel)]="filtroNombre" autocomplete="off" />
        <label for="nombre">Nombre</label>
    </p-floatlabel>
    <p-floatlabel variant="on">
        <input pInputText id="nombre" [(ngModel)]="filtroNombre" autocomplete="off" />
        <label for="nombre">correo</label>
    </p-floatlabel>
    <p-floatlabel variant="on">
        <input pInputText id="nombre" [(ngModel)]="filtroNombre" autocomplete="off" />
        <label for="nombre">Rol</label>
    </p-floatlabel>
    <button><i class="pi pi-search"></i></button>
    <button><i class="pi pi-refresh"></i></button>
  </section>

  <section class="contenedor tabla">
    
  </section>


  `,
  styleUrl: './Usuarios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosComponent {
  filtroNombre: string = '';
  
}
