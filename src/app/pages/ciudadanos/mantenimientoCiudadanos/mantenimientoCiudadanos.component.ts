import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, ElementRef, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { NavbarComponent } from "../../../layouts/navbar/navbar.component";
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FloatLabel, FloatLabelModule } from "primeng/floatlabel"
import { InputText, InputTextModule } from 'primeng/inputtext';
import { TableMantenimientoComponent } from "./tableMantenimiento/tableMantenimiento.component";
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import { ChartModule } from 'primeng/chart';
import { Ciudadano } from '../../../models/models';
import { DataService } from '../../../services/data.service';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-mantenimiento-ciudadanos',
  imports: [
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    TableMantenimientoComponent,
    CheckboxModule,
    ChartModule,
    FormsModule,
    DropdownModule,
    ButtonModule
  ],  template: `
<div class="container mx-auto p-6">
  <!-- Filtros (simplificados para mostrar el gráfico) -->
  <section class="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 class="text-2xl font-bold mb-4">Filtros de Búsqueda</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <input [(ngModel)]="nombreFilter" (input)="aplicarFiltros()" placeholder="Nombre" class="p-2 border rounded" />
      <input [(ngModel)]="apellidoPaternoFilter" (input)="aplicarFiltros()" placeholder="Apellido Paterno" class="p-2 border rounded" />
      <input [(ngModel)]="apellidoMaternoFilter" (input)="aplicarFiltros()" placeholder="Apellido Materno" class="p-2 border rounded" />
    </div>
  </section>

  <!-- Gráfico y Tabla -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
    <div class="bg-white rounded-lg shadow-md p-6 lg:col-span-1">
      <canvas #chartCanvas></canvas>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
      <app-table-mantenimiento
        [ciudadanos]="filteredCiudadanos"
        (actualizado)="onCiudadanoActualizado()"
      ></app-table-mantenimiento>
    </div>
  </div>
</div>

  `,
  styleUrl: './mantenimientoCiudadanos.component.scss',
})
export class MantenimientoCiudadanosComponent {
  ciudadanos: Ciudadano[] = [];
  filteredCiudadanos: Ciudadano[] = [];
  departamentos: string[] = [];

  nombreFilter = '';
  apellidoPaternoFilter = '';
  apellidoMaternoFilter = '';
  departamentoFilter = '';
  provinciaFilter = '';
  distritoFilter = '';
  estadosFilter: string[] = [];

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chartInstance!: Chart;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.ciudadanos = this.dataService.getCiudadanos();
    this.filteredCiudadanos = [...this.ciudadanos];
    this.departamentos = this.dataService.getDepartamentos();
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart(): void {
    const estadisticas = this.dataService.getEstadisticas();

    const data = {
      labels: ['Aprobados', 'En revisión', 'Rechazados'],
      datasets: [
        {
          data: [
            estadisticas.estados.aprobados,
            estadisticas.estados.enRevision,
            estadisticas.estados.rechazados,
          ],
          backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
          hoverBackgroundColor: ['#16a34a', '#ca8a04', '#dc2626'],
          borderWidth: 2,
          borderRadius: 10,
          spacing: 4,
        },
      ],
    };

    const options: ChartOptions<'doughnut'> = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            font: { size: 14 },
          },
        },
        title: {
          display: true,
          text: 'Estados de Ciudadanos',
          font: { size: 16 },
        },
      },
      cutout: '70%',
    };

    this.chartInstance = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data,
      options,
    } as ChartConfiguration<'doughnut'>);
  }

  aplicarFiltros(): void {
    this.filteredCiudadanos = this.ciudadanos.filter((ciudadano) => {
      const nombreMatch = ciudadano.nombre.toLowerCase().includes(this.nombreFilter.toLowerCase());
      const apellidoPMatch = ciudadano.apellidoPaterno.toLowerCase().includes(this.apellidoPaternoFilter.toLowerCase());
      const apellidoMMatch = ciudadano.apellidoMaterno.toLowerCase().includes(this.apellidoMaternoFilter.toLowerCase());
      const departamentoMatch = this.departamentoFilter ? ciudadano.departamento === this.departamentoFilter : true;
      const estadoMatch = this.estadosFilter.length === 0 || this.estadosFilter.includes(ciudadano.estado);
      return nombreMatch && apellidoPMatch && apellidoMMatch && departamentoMatch && estadoMatch;
    });
  }

  limpiarFiltros(): void {
    this.nombreFilter = '';
    this.apellidoPaternoFilter = '';
    this.apellidoMaternoFilter = '';
    this.departamentoFilter = '';
    this.provinciaFilter = '';
    this.distritoFilter = '';
    this.estadosFilter = [];
    this.filteredCiudadanos = [...this.ciudadanos];
  }

  onCiudadanoActualizado(): void {
    this.chartInstance.destroy(); // limpiar instancia anterior
    this.initChart();
  }
}
