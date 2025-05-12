import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';

@Component({
  selector: 'app-miembro',
  imports: [TableModule, ButtonModule, RouterLink, RouterModule],
  template: `
  
  <section class="contenedor acciones">

  </section>
  <section class="contenedor info">
    <div class="foto">
    <i class="pi bi-person-fill"></i>
    <span class="dni">DNI: {{dni}}</span>
    </div>
    <div class="datos">
      <h3>Nombre: <span>Frank Angelo</span></h3>
      <h3>Apellido: <span>Lopez Llamocca</span></h3>
      <h3>Edad: <span>21</span></h3>
      <h3>Genero: <span>Masculino</span></h3>
      <h3>Miembros: <span>110</span></h3>
      <h3>Telefono: <span><i class="pi pi-phone"></i>987654321</span></h3>
      <h3>Email: <span><i class="pi pi-envelope"></i>knarf2003angelo&#64;gmail.com</span></h3>
    </div>
  </section>
  <section class="contenedor miembros">
  <p-table [value]="personas" [tableStyle]="{ 'min-width': '60rem' }">
    <ng-template #header>
        <tr>
            <th pSortableColumn="dni" style="width:10%">
                DNI <p-sortIcon field="dni" />
            </th>
            <th pSortableColumn="nombre" style="width:10%">
                Nombre <p-sortIcon field="nombre" />
            </th>
            <th pSortableColumn="apellido_paterno" style="width:15%">
                Apellidos<p-sortIcon field="apellido_paterno" />
            </th>
            <th pSortableColumn="celular" style="width:10%">
                Celular <p-sortIcon field="celular" />
            </th>
            <th pSortableColumn="email" style="width:15%">
                Email <p-sortIcon field="email" />
            </th>
            <th pSortableColumn="accion" style="width:10%">
                Acción <p-sortIcon field="miembros" />
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-persona>
        <tr>
            <td>{{ persona.dni }}</td>
            <td>{{ persona.nombre }}</td>
            <td>{{ persona.apellido_paterno }} {{persona.apellido_materno}}</td>
            <td><a [href]="'https://wa.me/51' + persona.celular" target="_blank">{{ persona.celular }}</a></td>
            <td><a [href]="'mailto:' + persona.email">{{ persona.email }}</a></td>
            <td>
              <div class="acciones">
              <p-button click severity="info"><i class="pi pi-pencil"></i></p-button>
              <p-button severity="danger"><i class="pi pi-trash"></i></p-button>
              </div>
            </td>
        </tr>
    </ng-template>
    </p-table>
  </section>
  <section class="contenedor mapa">

  </section>
  
  `,
  styleUrl: './miembro.component.scss',
})
export class MiembroComponent {

  dni : string = '';

    // Datos de personas
    personas = [
      {
        dni: '12345678',
        nombre: 'Juan',
        apellido_paterno: 'Pérez',
        apellido_materno: 'Gómez',
        celular: '987654321',
        email: 'juan.perez@example.com',
        departamento: 'Lima',
        provincia: 'Lima',
        distrito: 'Miraflores',
      },
      {
        dni: '87654321',
        nombre: 'María',
        apellido_paterno: 'López',
        apellido_materno: 'Rodríguez',
        celular: '987654322',
        email: 'maria.lopez@example.com',
        departamento: 'Lima',
        provincia: 'Lima',
        distrito: 'San Isidro',
      },
      {
        dni: '45678912',
        nombre: 'Carlos',
        apellido_paterno: 'García',
        apellido_materno: 'Martínez',
        celular: '987654323',
        email: 'carlos.garcia@example.com',
        departamento: 'Arequipa',
        provincia: 'Arequipa',
        distrito: 'Yanahuara',
      },
      {
        dni: '78912345',
        nombre: 'Ana',
        apellido_paterno: 'Torres',
        apellido_materno: 'Vargas',
        celular: '987654324',
        email: 'ana.torres@example.com',
        departamento: 'Cusco',
        provincia: 'Cusco',
        distrito: 'San Blas',
      },
      {
        dni: '32165498',
        nombre: 'Luis',
        apellido_paterno: 'Fernández',
        apellido_materno: 'Díaz',
        celular: '987654325',
        email: 'luis.fernandez@example.com',
        departamento: 'Piura',
        provincia: 'Piura',
        distrito: 'Castilla',
      }
    ];
  

  constructor(private route:ActivatedRoute){}

  ngOnInit() {
    this.dni = this.route.snapshot.paramMap.get('dni') || '';  
  }


}
