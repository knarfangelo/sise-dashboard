import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-table-mantenimiento',
  standalone: true,
  imports: [
    TableModule,
    Dialog,
    ButtonModule,
    InputText,
    CommonModule,
    FloatLabel,
    FormsModule,
    DropdownModule,
  ],
  template: `
    <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
      <ng-template #header>
        <tr>
          <th>DNI</th>
          <th>Nombre</th>
          <th>Apellido P.</th>
          <th>Apellido M.</th>
          <th>Celular</th>
          <th>Estado</th>
          <th>Acción</th>
        </tr>
      </ng-template>
      <ng-template #body let-product>
        <tr>
          <td>{{ product.dni }}</td>
          <td>{{ product.nombre }}</td>
          <td>{{ product.apellidoPaterno }}</td>
          <td>{{ product.apellidoMaterno }}</td>
          <td>{{ product.celular }}</td>
          <td
            class="estados"
            [ngClass]="{
              'estado-en-revision': product.estado === 'En revisión',
              'estado-aprobado': product.estado === 'Aprobado',
              'estado-rechazado': product.estado === 'Rechazado'
            }"
          >
            <p><i class="pi pi-circle-fill"></i>{{ product.estado }}</p>
          </td>
          <td class="acciones">
            <button (click)="showDialog()" class="btn btn-primary">
              <i class="pi pi-pencil"></i>
            </button>
            <button class="btn btn-danger">
              <i class="pi pi-trash"></i>
            </button>
          </td>
        </tr>
      </ng-template>
    </p-table>

    <p-dialog
      class="dialogo"
      header="Actualizar Estado"
      [modal]="true"
      [(visible)]="visible"
      [style]="{ width: '25rem' }"
    >
    <p-floatlabel variant="on">
        <input
          pInputText
          id="on_label"
          [(ngModel)]="value3"
          autocomplete="off"
        />
        <label for="on_label">DNI</label>
      </p-floatlabel>
     
      <p-floatlabel variant="on">
        <input
          pInputText
          id="on_label"
          [(ngModel)]="value3"
          autocomplete="off"
        />
        <label for="on_label">Nombre</label>
      </p-floatlabel>

      <p-floatlabel variant="on">
        <input
          pInputText
          id="on_label_2"
          [(ngModel)]="value4"
          autocomplete="off"
        />
        <label for="on_label_2">Apellido Paterno</label>
      </p-floatlabel>

      <p-floatlabel variant="on">
        <input
          pInputText
          id="on_label_2"
          [(ngModel)]="value4"
          autocomplete="off"
        />
        <label for="on_label_2">Apellido Materno</label>
      </p-floatlabel>

      <p-floatlabel class="w-full md:w-full" variant="on">
        <p-dropdown
          [(ngModel)]="selectedEstado"
          inputId="on_label2"
          [options]="estados"
          appendTo="body"
          optionLabel="name"
          styleClass="w-full"
        ></p-dropdown>
        <label for="on_label2">Estados</label>
      </p-floatlabel>

    </p-dialog>
  `,
  styleUrl: './tableMantenimiento.component.scss',
})
export class TableMantenimientoComponent {
  visible: boolean = false;

  value3: string = '';
  value4: string = '';
  selectedEstado: any = null;

  estados = [
    { name: 'En revisión', code: 'ENR' },
    { name: 'Aprobado', code: 'APR' },
    { name: 'Rechazado', code: 'REJ' },
  ];

  products = [
    {
      dni: '1234567890',
      nombre: 'Juan',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'Gómez',
      celular: '987654321',
      estado: 'En revisión',
    },
    {
      dni: '0987654321',
      nombre: 'María',
      apellidoPaterno: 'López',
      apellidoMaterno: 'Martínez',
      celular: '123456789',
      estado: 'Aprobado',
    },
    {
      dni: '1122334455',
      nombre: 'Carlos',
      apellidoPaterno: 'García',
      apellidoMaterno: 'Hernández',
      celular: '456789123',
      estado: 'Rechazado',
    },
    {
      dni: '5566778899',
      nombre: 'Ana',
      apellidoPaterno: 'Ramírez',
      apellidoMaterno: 'Torres',
      celular: '789123456',
      estado: 'En revisión',
    },
  ];

  showDialog() {
    this.visible = true;
  }
}
