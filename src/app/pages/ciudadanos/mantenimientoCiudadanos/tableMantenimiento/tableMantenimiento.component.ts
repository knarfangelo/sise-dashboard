import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { Ciudadano } from '../../../../models/models';
import { SelectModule } from 'primeng/select';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-table-mantenimiento',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    SelectModule,
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    DropdownModule,
    ToastModule
  ],
  template: `
<p-toast></p-toast>

<p-table [value]="ciudadanos" [paginator]="true" [rows]="5" [tableStyle]="{ 'min-width': '100%' }">
  <ng-template pTemplate="header">
    <tr>
      <th>DNI</th>
      <th>Nombre</th>
      <th>Apellido P.</th>
      <th>Apellido M.</th>
      <th>Celular</th>
      <th>Departamento</th>
      <th>Estado</th>
      <th>Acciones</th>
    </tr>
  </ng-template>
  <ng-template pTemplate="body" let-ciudadano>
    <tr>
      <td>{{ ciudadano.dni }}</td>
      <td>{{ ciudadano.nombre }}</td>
      <td>{{ ciudadano.apellidoPaterno }}</td>
      <td>{{ ciudadano.apellidoMaterno }}</td>
      <td>
        <a [href]="'https://wa.me/51' + ciudadano.celular" target="_blank" class="flex items-center text-blue-500 hover:text-blue-700">
          <i class="pi pi-whatsapp mr-2"></i>{{ ciudadano.celular }}
        </a>
      </td>
      <td>{{ ciudadano.departamento }}</td>
      <td>
        <span [ngClass]="{
          'bg-yellow-100 text-yellow-800': ciudadano.estado === 'En revisión',
          'bg-green-100 text-green-800': ciudadano.estado === 'Aprobado',
          'bg-red-100 text-red-800': ciudadano.estado === 'Rechazado'
        }" class="px-3 py-1 rounded-full text-sm">
          {{ ciudadano.estado }}
        </span>
      </td>
      <td>
        <div class="flex gap-2">
          <button pButton pRipple type="button" icon="pi pi-pencil"
                  class="p-button-info p-button-sm"
                  (click)="showDialog(ciudadano)"></button>
          <button pButton pRipple type="button" icon="pi pi-trash"
                  class="p-button-danger p-button-sm"></button>
        </div>
      </td>
    </tr>
  </ng-template>
</p-table>

<p-dialog header="Editar Ciudadano" [(visible)]="visible" [modal]="true" [style]="{ width: '450px' }">
  <div *ngIf="ciudadanoSeleccionado" class="grid gap-4">
    <p-floatLabel>
      <input pInputText id="dni" [(ngModel)]="ciudadanoSeleccionado.dni" readonly />
      <label for="dni">DNI</label>
    </p-floatLabel>

    <p-floatLabel>
      <input pInputText id="nombre" [(ngModel)]="ciudadanoSeleccionado.nombre" />
      <label for="nombre">Nombre</label>
    </p-floatLabel>

    <div class="grid grid-cols-2 gap-4">
      <p-floatLabel>
        <input pInputText id="apellidoPaterno" [(ngModel)]="ciudadanoSeleccionado.apellidoPaterno" />
        <label for="apellidoPaterno">Apellido Paterno</label>
      </p-floatLabel>

      <p-floatLabel>
        <input pInputText id="apellidoMaterno" [(ngModel)]="ciudadanoSeleccionado.apellidoMaterno" />
        <label for="apellidoMaterno">Apellido Materno</label>
      </p-floatLabel>
    </div>

    <p-floatLabel>
      <input pInputText id="celular" [(ngModel)]="ciudadanoSeleccionado.celular" />
      <label for="celular">Celular</label>
    </p-floatLabel>

    <p-floatLabel>
    <p-select
  [options]="estados"
  [(ngModel)]="ciudadanoSeleccionado.estado"
  optionLabel="name"
  optionValue="name"
  appendTo="body"
  placeholder="Seleccione estado">
</p-select>
      <label for="estado">Estado</label>
    </p-floatLabel>
  </div>

  <ng-template pTemplate="footer">
    <button pButton pRipple icon="pi pi-times" label="Cancelar"
            class="p-button-text" (click)="visible=false"></button>
    <button pButton pRipple icon="pi pi-check" label="Guardar"
            class="p-button-success" (click)="guardarCambios()"></button>
  </ng-template>
</p-dialog>
  `,
  styleUrl: './tableMantenimiento.component.scss',
})
export class TableMantenimientoComponent {
  @Input() ciudadanos: Ciudadano[] = [];
  @Output() actualizado = new EventEmitter<void>();

  estados: { name: string; code: string }[] = [];

  visible: boolean = false;
  ciudadanoSeleccionado: Ciudadano | null = null;

  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.estados = this.dataService.getEstados();
  }

  showDialog(ciudadano: Ciudadano): void {
    this.ciudadanoSeleccionado = { ...ciudadano };
    this.visible = true;
  }

  guardarCambios(): void {
    if (!this.ciudadanoSeleccionado) return;

    const index = this.ciudadanos.findIndex(c => c.dni === this.ciudadanoSeleccionado!.dni);
    if (index !== -1) {
      this.ciudadanos[index] = { ...this.ciudadanoSeleccionado };
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Ciudadano actualizado correctamente'
      });
      this.actualizado.emit();
    }

    this.visible = false;
    this.ciudadanoSeleccionado = null;
  }
}
