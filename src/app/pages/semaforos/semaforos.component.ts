import { Component, OnInit } from '@angular/core';
import { SemaforoService } from '../../services/semaforo.service';
import { DepartamentoService } from '../../services/departamento.service';
import { Departamento, Distrito, Provincia, Semaforo } from '../../models/models';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-semaforos',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, SelectModule, FormsModule, DialogModule, InputTextModule],
  template: `
    <section class="contenedor">
      <div class="selectores">
        <!-- Departamento -->
        <p-select
          [options]="departamentos"
          [(ngModel)]="selectedDepartamento"
          optionLabel="nombre"
          placeholder="Seleccionar Departamento"
          (onChange)="onDepartamentoChange()"
        ></p-select>

        <!-- Provincia -->
        <p-select
          [options]="provincias"
          [(ngModel)]="selectedProvincia"
          optionLabel="nombre"
          placeholder="Seleccionar Provincia"
          (onChange)="onProvinciaChange()"
          [disabled]="!selectedDepartamento"
        ></p-select>

        <!-- Distrito -->
        <p-select
          [options]="distritos"
          [(ngModel)]="selectedDistrito"
          optionLabel="nombre"
          placeholder="Seleccionar Distrito"
          (onChange)="onDistritoChange()"
          [disabled]="!selectedProvincia"
        ></p-select>

        <!-- Botón reset -->
        <p-button type="button" icon="pi pi-refresh" label="Limpiar Filtros" (click)="resetFilters()" />
      </div>
    </section>

    <section class="contenedor">
      <div class="card">
        <p-table
          [value]="filteredSemaforos"
          [paginator]="true"
          [rows]="5"
          [first]="first"
          [rowsPerPageOptions]="[5, 10, 25]"
          [showCurrentPageReport]="true"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
          (onPage)="onPageChange($event)"
        >
          <ng-template pTemplate="header">
            <tr>
              <th>Departamento</th>
              <th>Provincia</th>
              <th>Distrito</th>
              <th>Rojo</th>
              <th>Amarillo</th>
              <th>Verde</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-s>
            <tr>
              <td>{{ s.departamento }}</td>
              <td>{{ s.provincia }}</td>
              <td>{{ s.distrito }}</td>
              <td><div class="foco rojo">{{ s.maxRojo }}</div></td>
              <td><div class="foco amarillo">{{ s.maxAmarillo }}</div></td>
              <td><div class="foco verde">{{ s.maxVerde }}</div></td>
              <td>
                <p-button (click)="showDialog(s)" label="Editar" />
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>

      <div class="card flex justify-center">
        <p-dialog header="Editar Semáforo" [modal]="true" [(visible)]="visible" [style]="{ width: '25rem' }">
          <div class="flex items-center gap-4 mb-4">
            <label for="rojo" class="font-semibold w-24">Rojo</label>
            <input pInputText id="rojo" [(ngModel)]="semaforo.maxRojo" class="flex-auto" autocomplete="off" />
          </div>
          <div class="flex items-center gap-4 mb-4">
            <label for="amarillo" class="font-semibold w-24">Amarillo</label>
            <input pInputText id="amarillo" [(ngModel)]="semaforo.maxAmarillo" class="flex-auto" autocomplete="off" />
          </div>
          <div class="flex items-center gap-4 mb-4">
            <label for="verde" class="font-semibold w-24">Verde</label>
            <input pInputText id="verde" [(ngModel)]="semaforo.maxVerde" class="flex-auto" autocomplete="off" />
          </div>
          <div class="flex justify-end gap-2">
            <p-button label="Cancelar" severity="secondary" (click)="visible = false" />
            <p-button label="Guardar" (click)="saveSemaphore()" />
          </div>
        </p-dialog>
      </div>
    </section>
  `,
  styleUrls: ['./semaforos.component.scss']
})
export class SemaforosComponent implements OnInit {
  semaforos: Semaforo[] = [];
  filteredSemaforos: Semaforo[] = [];
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];
  selectedDepartamento?: Departamento;
  selectedProvincia?: Provincia;
  selectedDistrito?: Distrito;
  first = 0;
  rows = 5;
  visible: boolean = false;
  semaforo: Semaforo = {
    maxRojo: 0, maxAmarillo: 0, maxVerde: 0,
    departamento: '',
    provincia: '',
    distrito: '',
    distritoId: 0,
    nombre: ''
  };

  constructor(
    private semaforoService: SemaforoService,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit(): void {
    this.loadSemaforos();
    this.loadDepartamentos();
  }

  loadSemaforos(): void {
    this.semaforoService.getSemaforos().subscribe((data) => {
      this.semaforos = data;
      this.filteredSemaforos = [...data];
    });
  }

  loadDepartamentos(): void {
    this.departamentoService.listarDepartamentos().subscribe((data) => {
      this.departamentos = data;
    });
  }

  onDepartamentoChange(): void {
    this.selectedProvincia = undefined;
    this.selectedDistrito = undefined;
    this.provincias = this.selectedDepartamento?.provincias ?? [];
    this.distritos = [];
    this.filterTable();
  }

  onProvinciaChange(): void {
    this.selectedDistrito = undefined;
    this.distritos = this.selectedProvincia?.distritos ?? [];
    this.filterTable();
  }

  onDistritoChange(): void {
    this.filterTable();
  }

  filterTable(): void {
    this.filteredSemaforos = this.semaforos.filter((s) => {
      const matchDep = !this.selectedDepartamento || s.departamento === this.selectedDepartamento.nombre;
      const matchProv = !this.selectedProvincia || s.provincia === this.selectedProvincia.nombre;
      const matchDist = !this.selectedDistrito || s.distrito === this.selectedDistrito.nombre;
      return matchDep && matchProv && matchDist;
    });
    this.first = 0;
  }

  resetFilters(): void {
    this.selectedDepartamento = undefined;
    this.selectedProvincia = undefined;
    this.selectedDistrito = undefined;
    this.provincias = [];
    this.distritos = [];
    this.filteredSemaforos = [...this.semaforos];
    this.first = 0;
  }

saveSemaphore(): void {
  if (this.selectedDistrito) {
    this.semaforo.nombre = `${this.selectedDepartamento?.nombre} - ${this.selectedProvincia?.nombre} - ${this.selectedDistrito.nombre}`;
    this.semaforo.distritoId = this.selectedDistrito.id;

    this.semaforoService.registrarSemaforo(this.semaforo).subscribe({
      next: () => {
        this.loadSemaforos();
        this.visible = false;
      },
      error: (err) => {
        console.error('Error al registrar semáforo:', err);
      }
    });
  }
}




  showDialog(semaforo: Semaforo): void {
    this.semaforo = { ...semaforo }; // Set semaphore data for editing
    this.visible = true;
  }

  onPageChange(event: { first: number; rows: number }): void {
    this.first = event.first;
    this.rows = event.rows;
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }

  isLastPage(): boolean {
    return this.first >= this.filteredSemaforos.length - this.rows;
  }
}
