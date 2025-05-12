import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { DepartamentoService } from '../../services/departamento.service';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { Departamento, Distrito, Persona, Provincia, SelectItem } from '../../models/models';

@Component({
  selector: 'app-redes',
  standalone: true,
  imports: [
    CommonModule,
    FloatLabel, 
    InputText, 
    FormsModule, 
    Button, 
    TableModule, 
    ChartModule, 
    RouterLink,
    RouterModule,
    SelectModule
  ],
  template: `
    <section class="contenedor">
      <div class="buscador">
        <p-floatlabel variant="on">
          <input pInputText id="dni" [(ngModel)]="filtroDni" autocomplete="off" />
          <label for="dni">DNI</label>
        </p-floatlabel>
        <p-floatlabel variant="on">
          <input pInputText id="nombre" [(ngModel)]="filtroNombre" autocomplete="off" />
          <label for="nombre">Nombre</label>
        </p-floatlabel>
        <p-floatlabel variant="on">
          <input pInputText id="apellido_paterno" [(ngModel)]="filtroApellidoPaterno" autocomplete="off" />
          <label for="apellido_paterno">Apellido Paterno</label>
        </p-floatlabel>
        <p-floatlabel variant="on">
          <input pInputText id="apellido_materno" [(ngModel)]="filtroApellidoMaterno" autocomplete="off" />
          <label for="apellido_materno">Apellido Materno</label>
        </p-floatlabel>
        
        <p-select
          id="departamento"
          [options]="departamentos"
          [(ngModel)]="filtroDepartamento"
          optionLabel="label"
          placeholder="Seleccionar Departamento"
          styleClass="w-full"
          (onChange)="onDepartamentoChange()"
        ></p-select>

        <p-select
          id="provincia"
          [options]="provincias"
          [(ngModel)]="filtroProvincia"
          optionLabel="label"
          placeholder="Seleccionar Provincia"
          styleClass="w-full"
          [disabled]="!filtroDepartamento"
          (onChange)="onProvinciaChange()"
        ></p-select>

        <p-select
          id="distrito"
          [options]="distritos"
          [(ngModel)]="filtroDistrito"
          optionLabel="label"
          placeholder="Seleccionar Distrito"
          styleClass="w-full"
          [disabled]="!filtroProvincia"
        ></p-select>
      </div>
      <div class="buscador">
        <p-button label="Buscar" icon="pi pi-search" styleClass="w-full" iconPos="left" severity="success" (click)="buscar()"/>
        <p-button label="Limpiar" icon="pi pi-refresh" styleClass="w-full" iconPos="left" severity="info" (click)="limpiar()"/>
      </div>
    </section>
    <section class="contenedor">
      <p-table [value]="personasFiltradas" [tableStyle]="{ 'min-width': '60rem' }">
        <ng-template pTemplate="header">
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
            <th pSortableColumn="miembros" style="width:10%">
              Miembros <p-sortIcon field="miembros" />
            </th>
            <th pSortableColumn="accion" style="width:10%">
              Acción <p-sortIcon field="miembros" />
            </th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-persona>
          <tr>
            <td>{{ persona.dni }}</td>
            <td>{{ persona.nombre }}</td>
            <td>{{ persona.apellido_paterno }} {{persona.apellido_materno}}</td>
            <td><a [href]="'https://wa.me/51' + persona.celular" target="_blank">{{ persona.celular }}</a></td>
            <td><a [href]="'mailto:' + persona.email">{{ persona.email }}</a></td>
            <td class="miembros"><i class="pi pi-users"></i> {{ persona.miembros }}</td>
            <td>
              <div class="acciones">
                <p-button severity="info" (click)="editarPersona(persona.dni)"><i class="pi pi-pencil"></i></p-button>
                <p-button severity="danger"><i class="pi pi-trash"></i></p-button>
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </section>
    <section class="contenedor">
      <p-chart type="bar" [data]="chartData" [options]="chartOptions" class="h-[30rem]" />
    </section>
  `,
  styleUrl: './redes.component.scss',
})
export class RedesComponent {
  // Variables para los filtros
  filtroDni = '';
  filtroNombre = '';
  filtroApellidoPaterno = '';
  filtroApellidoMaterno = '';
  filtroDepartamento: SelectItem | null = null;
  filtroProvincia: SelectItem | null = null;
  filtroDistrito: SelectItem | null = null;

  // Listas para los selects
  departamentos: SelectItem[] = [];
  provincias: SelectItem[] = [];
  distritos: SelectItem[] = [];
  departamentosData: Departamento[] = [];

  // Datos de personas
  personas: Persona[] = [
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
      miembros: 15
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
      miembros: 8
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
      miembros: 12
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
      miembros: 20
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
      miembros: 5
    }
  ];

  personasFiltradas: Persona[] = [...this.personas];

  // Datos del gráfico
  chartData: any;
  chartOptions: any;

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit(): void {
    this.prepararDatosGrafico();
    this.cargarDepartamentos();
  }

  cargarDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe({
      next: (data: Departamento[]) => {
        this.departamentosData = data;
        this.departamentos = data.map(departamento => ({
          label: departamento.nombre,
          value: departamento.id
        }));
        this.cd.markForCheck();
      },
      error: (error) => {
        console.error('Error al cargar departamentos:', error);
      }
    });
  }

  onDepartamentoChange(): void {
    if (this.filtroDepartamento) {
      const departamentoSeleccionado = this.departamentosData.find(
        d => d.id === this.filtroDepartamento?.value
      );
      
      if (departamentoSeleccionado) {
        this.provincias = departamentoSeleccionado.provincias.map(provincia => ({
          label: provincia.nombre,
          value: provincia.id
        }));
      }
    } else {
      this.provincias = [];
    }
    
    this.filtroProvincia = null;
    this.filtroDistrito = null;
    this.distritos = [];
    this.cd.markForCheck();
  }

  onProvinciaChange(): void {
    if (this.filtroDepartamento && this.filtroProvincia) {
      const departamentoSeleccionado = this.departamentosData.find(
        d => d.id === this.filtroDepartamento?.value
      );
      
      if (departamentoSeleccionado) {
        const provinciaSeleccionada = departamentoSeleccionado.provincias.find(
          p => p.id === this.filtroProvincia?.value
        );
        
        if (provinciaSeleccionada) {
          this.distritos = provinciaSeleccionada.distritos.map(distrito => ({
            label: distrito.nombre,
            value: distrito.id
          }));
        }
      }
    } else {
      this.distritos = [];
    }
    
    this.filtroDistrito = null;
    this.cd.markForCheck();
  }

  prepararDatosGrafico(): void {
    const personasOrdenadas = [...this.personas].sort((a, b) => b.miembros - a.miembros);
    const topPersonas = personasOrdenadas.slice(0, 5);
    
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-secondary-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
      labels: topPersonas.map(p => `${p.nombre} ${p.apellido_paterno}`),
      datasets: [
        {
          label: 'Número de miembros',
          backgroundColor: documentStyle.getPropertyValue('--primary-500'),
          borderColor: documentStyle.getPropertyValue('--primary-500'),
          data: topPersonas.map(p => p.miembros)
        }
      ]
    };

    this.chartOptions = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const persona = topPersonas[context.dataIndex];
              return [
                `Nombre: ${persona.nombre} ${persona.apellido_paterno}`,
                `DNI: ${persona.dni}`,
                `Miembros: ${persona.miembros}`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  buscar(): void {
    const departamentoNombre = this.filtroDepartamento?.label ?? '';
    const provinciaNombre = this.filtroProvincia?.label ?? '';
    const distritoNombre = this.filtroDistrito?.label ?? '';

    this.personasFiltradas = this.personas.filter(persona => {
      return (
        (!this.filtroDni || persona.dni.includes(this.filtroDni)) &&
        (!this.filtroNombre || persona.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())) &&
        (!this.filtroApellidoPaterno || persona.apellido_paterno.toLowerCase().includes(this.filtroApellidoPaterno.toLowerCase())) &&
        (!this.filtroApellidoMaterno || persona.apellido_materno.toLowerCase().includes(this.filtroApellidoMaterno.toLowerCase())) &&
        (!departamentoNombre || persona.departamento.toLowerCase() === departamentoNombre.toLowerCase()) &&
        (!provinciaNombre || persona.provincia.toLowerCase() === provinciaNombre.toLowerCase()) &&
        (!distritoNombre || persona.distrito.toLowerCase() === distritoNombre.toLowerCase())
      );
    });
    
    this.prepararDatosGrafico();
    this.cd.markForCheck();
  }

  limpiar(): void {
    this.filtroDni = '';
    this.filtroNombre = '';
    this.filtroApellidoPaterno = '';
    this.filtroApellidoMaterno = '';
    this.filtroDepartamento = null;
    this.filtroProvincia = null;
    this.filtroDistrito = null;
    this.provincias = [];
    this.distritos = [];
    this.personasFiltradas = [...this.personas];
    this.prepararDatosGrafico();
    this.cd.markForCheck();
  }

  editarPersona(dni: string): void {
    this.router.navigate([dni], { relativeTo: this.route });
  }
}