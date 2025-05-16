import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { DepartamentoService } from '../../services/departamento.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';

Chart.register(...registerables);

interface Departamento {
  id: number;
  nombre: string;
  miembros: number;
  provincias: Provincia[];
}

interface Provincia {
  id: number;
  nombre: string;
  miembros: number;
  distritos: Distrito[];
}

interface Distrito {
  id: number;
  nombre: string;
  miembros: number;
  semaforo?: {
    maxRojo: number;
    maxAmarillo: number;
    maxVerde: number;
  };
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    DividerModule,
    ChartModule,
    ProgressBarModule,
    DropdownModule,
    FormsModule,
    TooltipModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Datos de ejemplo (simulados)
  gestores = 120;
  distritales = 85;
  provinciales = 42;
  departamentales = 25;

  // Datos para gráficos
  lineChartData: any;
  lineChartOptions: any;
  barChartData: any;
  barChartOptions: any;
  pieChartData: any;
  pieChartOptions: any;

  // Datos de regiones
  departamentos: Departamento[] = [];
  selectedDepartamento: Departamento | null = null;
  selectedProvincia: Provincia | null = null;
  provinciasFiltradas: Provincia[] = [];
  distritosFiltrados: Distrito[] = [];

  // Opciones para dropdowns
  departamentoOptions: any[] = [];
  provinciaOptions: any[] = [];
  distritoOptions: any[] = [];

  constructor(private departamentoService: DepartamentoService) {}

  ngOnInit(): void {
    this.initCharts();
    this.loadDepartamentos();
  }

  initCharts(): void {
    // Gráfico de miembros registrados por día
    this.lineChartData = {
      labels: ['1 Jun', '2 Jun', '3 Jun', '4 Jun', '5 Jun', '6 Jun', '7 Jun'],
      datasets: [
        {
          label: 'Miembros registrados',
          data: [12, 19, 15, 27, 22, 18, 24],
          fill: true,
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4
        }
      ]
    };

    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    // Gráfico de barras por departamento
    this.barChartData = {
      labels: ['Lima', 'Arequipa', 'Cusco', 'Piura', 'La Libertad'],
      datasets: [
        {
          label: 'Miembros registrados',
          backgroundColor: '#4F46E5',
          data: [1250, 780, 620, 540, 480]
        }
      ]
    };

    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    };

    // Gráfico circular de distribución
    this.pieChartData = {
      labels: ['Lima', 'Provincias'],
      datasets: [
        {
          data: [1250, 2420],
          backgroundColor: ['#4F46E5', '#10B981']
        }
      ]
    };

    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    };
  }

  loadDepartamentos(): void {
    // Simulamos datos del backend
    this.departamentoService.listarDepartamentos().subscribe({
      next: (data) => {
        // Procesamos datos reales si los hay
        if (data && data.length > 0) {
          this.departamentos = this.processDepartamentoData(data);
        } else {
          // Datos simulados
          this.departamentos = this.getMockDepartamentos();
        }
        
        this.departamentoOptions = this.departamentos.map(d => ({
          label: d.nombre,
          value: d
        }));
      },
      error: (error) => {
        console.error('Error al cargar departamentos', error);
        this.departamentos = this.getMockDepartamentos();
        this.departamentoOptions = this.departamentos.map(d => ({
          label: d.nombre,
          value: d
        }));
      }
    });
  }

  processDepartamentoData(data: any[]): Departamento[] {
    return data.map(dep => ({
      id: dep.id,
      nombre: dep.nombre,
      miembros: Math.floor(Math.random() * 1000), // Simulamos cantidad de miembros
      provincias: dep.provincias.map((prov: any) => ({
        id: prov.id,
        nombre: prov.nombre,
        miembros: Math.floor(Math.random() * 500), // Simulamos cantidad de miembros
        distritos: prov.distritos.map((dist: any) => ({
          id: dist.id,
          nombre: dist.nombre,
          miembros: Math.floor(Math.random() * 200), // Simulamos cantidad de miembros
          semaforo: dist.semaforo
        }))
      }))
    }));
  }

  getMockDepartamentos(): Departamento[] {
    return [
      {
        id: 1,
        nombre: 'Lima',
        miembros: 1250,
        provincias: [
          {
            id: 11,
            nombre: 'Lima Metropolitana',
            miembros: 850,
            distritos: [
              { id: 111, nombre: 'Miraflores', miembros: 120, semaforo: { maxRojo: 50, maxAmarillo: 150, maxVerde: 300 } },
              { id: 112, nombre: 'San Isidro', miembros: 95, semaforo: { maxRojo: 40, maxAmarillo: 120, maxVerde: 250 } },
              { id: 113, nombre: 'Barranco', miembros: 78, semaforo: { maxRojo: 30, maxAmarillo: 100, maxVerde: 200 } }
            ]
          },
          {
            id: 12,
            nombre: 'Huaral',
            miembros: 150,
            distritos: [
              { id: 121, nombre: 'Chancay', miembros: 45, semaforo: { maxRojo: 20, maxAmarillo: 60, maxVerde: 120 } },
              { id: 122, nombre: 'Aucallama', miembros: 32, semaforo: { maxRojo: 15, maxAmarillo: 50, maxVerde: 100 } }
            ]
          }
        ]
      },
      {
        id: 2,
        nombre: 'Arequipa',
        miembros: 780,
        provincias: [
          {
            id: 21,
            nombre: 'Arequipa',
            miembros: 520,
            distritos: [
              { id: 211, nombre: 'Yanahuara', miembros: 85, semaforo: { maxRojo: 30, maxAmarillo: 90, maxVerde: 180 } },
              { id: 212, nombre: 'Cayma', miembros: 76, semaforo: { maxRojo: 25, maxAmarillo: 80, maxVerde: 160 } }
            ]
          }
        ]
      }
    ];
  }

  onDepartamentoChange(): void {
    if (this.selectedDepartamento) {
      this.provinciasFiltradas = this.selectedDepartamento.provincias;
      this.provinciaOptions = this.provinciasFiltradas.map(p => ({
        label: p.nombre,
        value: p
      }));
      this.selectedProvincia = null;
      this.distritosFiltrados = [];
    } else {
      this.provinciasFiltradas = [];
      this.provinciaOptions = [];
      this.selectedProvincia = null;
      this.distritosFiltrados = [];
    }
  }

  onProvinciaChange(): void {
    if (this.selectedProvincia) {
      this.distritosFiltrados = this.selectedProvincia.distritos;
      this.distritoOptions = this.distritosFiltrados.map(d => ({
        label: d.nombre,
        value: d
      }));
    } else {
      this.distritosFiltrados = [];
      this.distritoOptions = [];
    }
  }

  getSemaforoClass(distrito: Distrito): string {
    if (!distrito.semaforo) return 'bg-gray-200';
    
    if (distrito.miembros <= distrito.semaforo.maxRojo) {
      return 'bg-red-500';
    } else if (distrito.miembros <= distrito.semaforo.maxAmarillo) {
      return 'bg-yellow-500';
    } else {
      return 'bg-green-500';
    }
  }

  getSemaforoText(distrito: Distrito): string {
    if (!distrito.semaforo) return 'Sin datos';
    
    if (distrito.miembros <= distrito.semaforo.maxRojo) {
      return 'Bajo registro';
    } else if (distrito.miembros <= distrito.semaforo.maxAmarillo) {
      return 'Registro medio';
    } else {
      return 'Alto registro';
    }
  }

  getProgressValue(distrito: Distrito): number {
    if (!distrito.semaforo) return 0;
    
    const max = distrito.semaforo.maxVerde;
    return Math.min((distrito.miembros / max) * 100, 100);
  }
}