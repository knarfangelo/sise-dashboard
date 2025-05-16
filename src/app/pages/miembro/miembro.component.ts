import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-miembro',
  imports: [
    CommonModule,
    TableModule, 
    ButtonModule, 
    RouterLink, 
    RouterModule,
    CardModule,
    ChartModule,
    TooltipModule,
    DividerModule,
    TagModule
  ],
  template: `
  
  <div class="container mx-auto px-4 py-6">
  <!-- Encabezado -->
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold text-gray-800">Información del Gestor</h1>
    <button 
      pButton 
      icon="pi pi-arrow-left" 
      label="Volver" 
      class="p-button-outlined p-button-secondary"
      routerLink="/redes">
    </button>
  </div>

  <!-- Información principal -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
    <!-- Foto y datos básicos -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <div class="flex flex-col items-center mb-4">
        <i class="pi pi-user text-8xl text-gray-400 mb-3"></i>
        <span class="text-xl font-semibold">DNI: {{miembro.dni}}</span>
      </div>
      
      <div class="space-y-3">
        <div>
          <span class="text-sm font-medium text-gray-500 block">Nombre completo</span>
          <span class="text-lg">{{miembro.nombre}} {{miembro.apellido_paterno}} {{miembro.apellido_materno}}</span>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <span class="text-sm font-medium text-gray-500 block">Edad</span>
            <span>{{miembro.edad}} años</span>
          </div>
          <div>
            <span class="text-sm font-medium text-gray-500 block">Género</span>
            <span>{{miembro.genero}}</span>
          </div>
        </div>
        
        <div>
          <span class="text-sm font-medium text-gray-500 block">Teléfono</span>
          <a [href]="'https://wa.me/51' + miembro.telefono" target="_blank" class="flex items-center gap-2">
            <i class="pi pi-whatsapp text-green-500"></i>
            {{miembro.telefono}}
          </a>
        </div>
        
        <div>
          <span class="text-sm font-medium text-gray-500 block">Email</span>
          <a [href]="'mailto:' + miembro.email" class="flex items-center gap-2">
            <i class="pi pi-envelope text-blue-500"></i>
            {{miembro.email}}
          </a>
        </div>
        
        <div>
          <span class="text-sm font-medium text-gray-500 block">Dirección</span>
          <span>{{miembro.direccion}}</span>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <span class="text-sm font-medium text-gray-500 block">Fecha de ingreso</span>
            <span>{{miembro.fecha_ingreso}}</span>
          </div>
          <div>
            <span class="text-sm font-medium text-gray-500 block">Estado</span>
            <p-tag [severity]="getEstadoSeverity(miembro.estado)" [value]="miembro.estado"></p-tag>
          </div>
        </div>
      </div>
    </div>

    <!-- Gráficos -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">Miembros Registrados por Mes</h2>
      <div class="h-64">
        <p-chart type="bar" [data]="chartData" [options]="chartOptions"></p-chart>
      </div>
      
      <p-divider></p-divider>
      
      <h2 class="text-xl font-semibold mb-4 mt-4">Composición Miembros</h2>
      <div class="h-74">
        <p-chart type="pie" [data]="familyChartData" [options]="familyChartOptions"></p-chart>
      </div>
    </div>

    <!-- Actividades recientes -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">Tareas recientes</h2>
      <div class="space-y-4">
        <div *ngFor="let actividad of actividades" class="border-b pb-3 last:border-0">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-medium">{{actividad.evento}}</h3>
              <span class="text-sm text-gray-500">{{actividad.fecha}}</span>
            </div>
            <p-tag [severity]="getParticipacionSeverity(actividad.participacion)" [value]="actividad.participacion"></p-tag>
          </div>
        </div>
      </div>
      
    </div>
  </div>

  <!-- Familiares -->
  <div class="bg-white rounded-xl shadow-md p-6 mb-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Miembros registrados</h2>
    </div>
    
    <p-table [value]="familiares" [paginator]="true" [rows]="5" [showCurrentPageReport]="true" 
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} entradas"
      [rowsPerPageOptions]="[5,10,25]">
      <ng-template pTemplate="header">
        <tr>
          <th>DNI</th>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Contacto</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-familiar>
        <tr>
          <td>{{familiar.dni}}</td>
          <td>{{familiar.nombre}} {{familiar.apellidos}}</td>
          <td>{{familiar.edad}} años</td>
          <td>
            <div class="flex flex-col">
              <a [href]="'https://wa.me/51' + familiar.telefono" target="_blank" class="flex items-center gap-1">
                <i class="pi pi-whatsapp text-green-500"></i>
                {{familiar.telefono}}
              </a>
              <a [href]="'mailto:' + familiar.email" class="flex items-center gap-1">
                <i class="pi pi-envelope text-blue-500"></i>
                {{familiar.email}}
              </a>
            </div>
          </td>
        </tr>
      </ng-template>
    </p-table>
  </div>

  <!-- Mapa de ubicación -->
</div>

  `,
  styleUrl: './miembro.component.scss',
})
export class MiembroComponent {
  dni: string = '';
  chartData: any;
  chartOptions: any;
  familyChartData: any;
  familyChartOptions: any;

  // Datos del miembro principal
  miembro = {
    dni: '76543210',
    nombre: 'Frank Angelo',
    apellido_paterno: 'Lopez',
    apellido_materno: 'Llamocca',
    edad: 21,
    genero: 'Masculino',
    telefono: '987654321',
    email: 'knarf2003angelo@gmail.com',
    direccion: 'Av. Ejemplo 123, Miraflores, Lima',
    fecha_ingreso: '15/01/2020',
    estado: 'Activo'
  };

  // Datos de familiares
  familiares = [
    {
      relacion: 'Padre',
      dni: '12345678',
      nombre: 'Juan',
      apellidos: 'Pérez Gómez',
      edad: 45,
      telefono: '987654321',
      email: 'juan.perez@example.com'
    },
    {
      relacion: 'Madre',
      dni: '23456789',
      nombre: 'María',
      apellidos: 'López Rodríguez',
      edad: 42,
      telefono: '987654322',
      email: 'maria.lopez@example.com'
    },
    {
      relacion: 'Hermano',
      dni: '34567890',
      nombre: 'Carlos',
      apellidos: 'Lopez Llamocca',
      edad: 18,
      telefono: '987654323',
      email: 'carlos.lopez@example.com'
    }
  ];

  // Datos de actividades recientes
  actividades = [
    { fecha: '10/06/2023', evento: 'Reunión mensual', participacion: 'Asistió' },
    { fecha: '25/05/2023', evento: 'Taller de capacitación', participacion: 'Asistió' },
    { fecha: '12/05/2023', evento: 'Evento comunitario', participacion: 'Organizador' },
    { fecha: '30/04/2023', evento: 'Reunión mensual', participacion: 'Asistió' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.dni = this.route.snapshot.paramMap.get('dni') || this.miembro.dni;
    this.initCharts();
  }

  initCharts() {
    // Gráfico de participación en eventos
    this.chartData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Miembros registrados',
          backgroundColor: '#4f46e5',
          data: [2, 1, 3, 2, 3, 1]
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    };

    // Gráfico de composición familiar
    this.familyChartData = {
      labels: ['Aprobados', 'En revision', 'Desaprobados'],
      datasets: [
        {
          data: [2, 1, 0],
          backgroundColor: [
            '#4f46e5',
            '#6366f1',
            '#a5b4fc',
          ]
        }
      ]
    };

    this.familyChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    };
  }

  getEstadoSeverity(estado: string) {
    switch (estado) {
      case 'Activo': return 'success';
      case 'Inactivo': return 'warn';
      case 'Suspendido': return 'danger';
      default: return 'info';
    }
  }

  getParticipacionSeverity(participacion: string) {
    switch (participacion) {
      case 'Asistió': return 'success';
      case 'Organizador': return 'info';
      case 'Invitado': return 'warn';
      default: return undefined;
    }
  }


}
