import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

type Prioridad = 'Alta' | 'Media' | 'Baja';
interface Tarea {
  id: number;
  mensaje: string;
  destinatario: string;
  fecha: Date;
  leido: boolean;
  prioridad: Prioridad;
}
const tareasMock: Tarea[] = [
  {
    id: 1,
    mensaje: 'Revisión de documento importante',
    destinatario: 'Juan Pérez',
    leido: false,
    prioridad: 'Alta',
    fecha: new Date(),
  },
];

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    AvatarModule,
    BadgeModule,
    DropdownModule,
    InputTextModule,
  ],
  template: `
    <p-toast position="top-right"></p-toast>
    <div class="contenedor">
      <div class="header">
        <h2><i class="pi pi-tasks mr-2"></i>Gestor de Tareas</h2>
        <div class="actions">
          <input
            type="text"
            [(ngModel)]="filtroBusqueda"
            (input)="filtrarTareas()"
            placeholder="Buscar tareas..."
            class="search-input"
          />
          <button
            pButton
            icon="pi pi-plus"
            label="Nueva Tarea"
            class="p-button-sm"
            (click)="abrirDialogoNuevaTarea()"
          ></button>
        </div>
      </div>
      <p-table
        [value]="tareasFiltradas"
        [paginator]="true"
        [rows]="10"
        scrollHeight="400px"
      >
        <ng-template pTemplate="header"
          ><tr>
            <th>ID</th>
            <th>Mensaje</th>
            <th>Destinatario</th>
            <th>Fecha</th>
            <th>Prioridad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr></ng-template
        >
        <ng-template pTemplate="body" let-tarea>
          <tr [class.row-leida]="tarea.leido">
            <td>{{ tarea.id }}</td>
            <td>{{ tarea.mensaje }}</td>
            <td>
              <p-avatar
                [label]="tarea.destinatario.charAt(0)"
                shape="circle"
                styleClass="bg-blue-500 text-white"
              ></p-avatar>
              {{ tarea.destinatario }}
            </td>
            <td>{{ tarea.fecha | date : 'mediumDate' }}</td>
            <td>
              <p-tag
                [value]="tarea.prioridad"
                [severity]="obtenerColorPrioridad(tarea.prioridad)"
              ></p-tag>
            </td>
            <td>
              <p-tag
                [value]="tarea.leido ? 'Leído' : 'Pendiente'"
                [severity]="tarea.leido ? 'success' : 'warn'"
              ></p-tag>
            </td>
            <td>
              <button
                pButton
                icon="pi pi-eye"
                class="p-button-rounded p-button-info p-button-sm"
                (click)="marcarComoLeido(tarea)"
              ></button>
              <button
                pButton
                icon="pi pi-pencil"
                class="p-button-rounded p-button-warning p-button-sm"
                (click)="abrirDialogoEditarTarea(tarea)"
              ></button>
              <button
                pButton
                icon="pi pi-trash"
                class="p-button-rounded p-button-danger p-button-sm"
                (click)="confirmarEliminarTarea(tarea)"
              ></button>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>

    <p-dialog
      [(visible)]="mostrarDialog"
      [modal]="true"
      [style]="{ width: '600px' }"
      [header]="modoEditar ? 'Editar Tarea' : 'Nueva Tarea'"
      (onHide)="resetearFormulario()"
    >
      <form (ngSubmit)="guardarTarea(tareaForm)" #tareaForm="ngForm">
        <div class="p-fluid">
          <div>
            <label>Destinatario</label>
            <input
              type="text"
              [(ngModel)]="tareaActual.destinatario"
              name="destinatario"
              required
              minlength="3"
              maxlength="50"
            />
          </div>
          <div>
            <label>Mensaje</label>
            <textarea
              [(ngModel)]="tareaActual.mensaje"
              name="mensaje"
              rows="4"
              required
              minlength="5"
              maxlength="500"
              class="custom-textarea"
            ></textarea>
            <small>{{ tareaActual.mensaje?.length || 0 }}/500</small>
          </div>
          <div>
            <label>Prioridad</label>
            <p-dropdown
              [options]="prioridades"
              [(ngModel)]="tareaActual.prioridad"
              name="prioridad"
            ></p-dropdown>
          </div>
        </div>
        <ng-template pTemplate="footer">
          <button
            pButton
            type="button"
            label="Cancelar"
            class="p-button-text"
            (click)="mostrarDialog = false"
          ></button>
          <button
            pButton
            type="submit"
            [label]="modoEditar ? 'Actualizar' : 'Guardar'"
            class="p-button-success"
          ></button>
        </ng-template>
      </form>
    </p-dialog>

    <p-dialog
      [(visible)]="mostrarConfirmacionEliminar"
      [modal]="true"
      [style]="{ width: '450px' }"
      header="Confirmar eliminación"
    >
      <div>
        <i class="pi pi-exclamation-triangle"></i> ¿Eliminar tarea ID:
        {{ tareaAEliminar?.id }}?
      </div>
      <ng-template pTemplate="footer">
        <button
          pButton
          label="Cancelar"
          class="p-button-text"
          (click)="mostrarConfirmacionEliminar = false"
        ></button>
        <button
          pButton
          label="Eliminar"
          class="p-button-danger"
          (click)="eliminarTarea()"
        ></button>
      </ng-template>
    </p-dialog>
  `,
  styles: [
    `
      .contenedor {
        max-width: 80%;
        min-width: 1150px;
        margin: auto;
        padding: 20px;
        background: #fff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .actions {
        display: flex;
        gap: 10px;
      }
      .search-input {
        width: 200px;
      }
      .custom-textarea {
        width: 100%;
        resize: vertical;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 0.5rem;
      }
    `,
  ],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TareasComponent implements OnInit {
  tareas: Tarea[] = tareasMock;
  tareasFiltradas: Tarea[] = [];
  filtroBusqueda = '';
  mostrarDialog = false;
  mostrarConfirmacionEliminar = false;
  tareaActual: Partial<Tarea> = this.crearTareaVacia();
  tareaAEliminar: Tarea | null = null;
  modoEditar = false;
  prioridades = [
    { label: 'Alta', value: 'Alta' },
    { label: 'Media', value: 'Media' },
    { label: 'Baja', value: 'Baja' },
  ];

  constructor(private ms: MessageService) {}
  ngOnInit() {
    this.filtrarTareas();
  }
  crearTareaVacia(): Partial<Tarea> {
    return {
      id: 0,
      mensaje: '',
      destinatario: '',
      fecha: new Date(),
      leido: false,
      prioridad: 'Media',
    };
  }
  filtrarTareas() {
    this.tareasFiltradas = this.filtroBusqueda
      ? this.tareas.filter(
          (t) =>
            t.mensaje
              .toLowerCase()
              .includes(this.filtroBusqueda.toLowerCase()) ||
            t.destinatario
              .toLowerCase()
              .includes(this.filtroBusqueda.toLowerCase())
        )
      : [...this.tareas];
  }
  abrirDialogoNuevaTarea() {
    this.modoEditar = false;
    this.tareaActual = this.crearTareaVacia();
    this.mostrarDialog = true;
  }
  abrirDialogoEditarTarea(t: Tarea) {
    this.modoEditar = true;
    this.tareaActual = { ...t };
    this.mostrarDialog = true;
  }
  guardarTarea(f: NgForm) {
    if (f.invalid)
      return this.ms.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Complete todos los campos correctamente',
      });
    const nueva = {
      ...this.tareaActual,
      id: this.modoEditar ? this.tareaActual.id! : this.generarId(),
      fecha: new Date(),
      leido: false,
    } as Tarea;
    this.modoEditar ? this.actualizarTarea(nueva) : this.agregarTarea(nueva);
    this.resetearFormulario();
  }
  generarId() {
    return Math.max(...this.tareas.map((t) => t.id), 0) + 1;
  }
  actualizarTarea(t: Tarea) {
    const i = this.tareas.findIndex((x) => x.id === t.id);
    if (i !== -1) this.tareas[i] = t;
    this.ms.add({
      severity: 'success',
      summary: 'Actualizada',
      detail: 'La tarea fue actualizada',
    });
    this.filtrarTareas();
  }
  agregarTarea(t: Tarea) {
    this.tareas.unshift(t);
    this.ms.add({
      severity: 'success',
      summary: 'Guardada',
      detail: 'La nueva tarea fue guardada',
    });
    this.filtrarTareas();
  }
  resetearFormulario() {
    this.mostrarDialog = false;
    this.tareaActual = this.crearTareaVacia();
  }
  confirmarEliminarTarea(t: Tarea) {
    this.tareaAEliminar = t;
    this.mostrarConfirmacionEliminar = true;
  }
  eliminarTarea() {
    this.tareas = this.tareas.filter((t) => t.id !== this.tareaAEliminar?.id);
    this.ms.add({
      severity: 'success',
      summary: 'Eliminada',
      detail: 'Tarea eliminada',
    });
    this.mostrarConfirmacionEliminar = false;
    this.filtrarTareas();
  }
  marcarComoLeido(t: Tarea) {
    t.leido = true;
  }
  obtenerColorPrioridad(prioridad: Prioridad): "success" | "warn" | "danger" {
    const colores: Record<Prioridad, "success" | "warn" | "danger"> = {
      Alta: "danger",
      Media: "warn",
      Baja: "success"
    };
    return colores[prioridad];
  }

}
