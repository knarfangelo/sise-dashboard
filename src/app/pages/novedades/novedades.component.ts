import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { Chart, registerables } from 'chart.js';
import { MessageService } from 'primeng/api';
import { InputTextarea } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DepartamentoService } from '../../services/departamento.service';

Chart.register(...registerables);

interface Departamento {
  id: number;
  nombre: string;
  provincias: Provincia[];
}

interface Provincia {
  id: number;
  nombre: string;
  distritos: Distrito[];
}

interface Distrito {
  id: number;
  nombre: string;
}

interface Novedad {
  id?: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  foto?: string | ArrayBuffer | null;
  departamento?: string;
  provincia?: string;
  distrito: string;
  fecha: Date;
}

@Component({
  selector: 'app-novedades',
  standalone: true,
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ToastModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    CardModule,
    InputTextarea,
    CalendarModule
  ],
  providers: [MessageService],
})
export class NovedadesComponent implements OnInit {
  // Filtros
  selectedFilterDepartment: Departamento | null = null;
  selectedFilterProvince: Provincia | null = null;
  selectedFilterDistrict: Distrito | null = null;

  filteredProvincias: Provincia[] = [];
  filteredDistritos: Distrito[] = [];

  // Datos
  novedades: Novedad[] = [];
  allNovedades: Novedad[] = [];
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];

  selectedDepartment: Departamento | null = null;
  selectedProvince: Provincia | null = null;
  selectedDistrict: Distrito | null = null;

  chart: any;

  // Formulario
  displayDialog: boolean = false;
  currentNovedad: Novedad = this.emptyNovedad();
  editMode: boolean = false;
  uploadedFile: any;

  // Opciones
  categoriaOptions = [
    { label: 'Evento', value: 'evento' },
    { label: 'Noticia', value: 'noticia' },
    { label: 'Alerta', value: 'alerta' },
    { label: 'Anuncio', value: 'anuncio' }
  ];

  constructor(
    private messageService: MessageService,
    private departamentoService: DepartamentoService
  ) { }

  ngOnInit(): void {
    this.loadDepartamentos();
    this.loadMockNovedades();
  }

  emptyNovedad(): Novedad {
    return {
      titulo: '',
      descripcion: '',
      categoria: 'noticia',
      distrito: '',
      fecha: new Date()
    };
  }

  loadMockNovedades(): void {
    this.allNovedades = [
      {
        id: 1,
        titulo: 'Feria de Tecnología',
        descripcion: 'Gran feria tecnológica en el centro de Miraflores',
        categoria: 'evento',
        departamento: 'Lima',
        provincia: 'Lima Metropolitana',
        distrito: 'Miraflores',
        fecha: new Date('2023-06-15')
      },
      {
        id: 2,
        titulo: 'Corte de agua programado',
        descripcion: 'Corte de agua este fin de semana en San Isidro',
        categoria: 'alerta',
        departamento: 'Lima',
        provincia: 'Lima Metropolitana',
        distrito: 'San Isidro',
        fecha: new Date('2023-06-10')
      },
      {
        id: 3,
        titulo: 'Festival Cultural',
        descripcion: 'Festival cultural en el distrito de Wanchaq',
        categoria: 'evento',
        departamento: 'Cusco',
        provincia: 'Cusco',
        distrito: 'Wanchaq',
        fecha: new Date('2023-06-20')
      }
    ];
    this.novedades = [...this.allNovedades];
    this.updateChart();
  }

  loadDepartamentos(): void {
    this.departamentoService.listarDepartamentos().subscribe({
      next: (departamentos) => {
        this.departamentos = departamentos;
      },
      error: (error) => {
        console.error('Error al cargar departamentos', error);
        // Cargar datos mock si falla el servicio
        this.departamentos = this.getMockDepartamentos();
      }
    });
  }

  getMockDepartamentos(): Departamento[] {
    return [
      {
        id: 1,
        nombre: 'Lima',
        provincias: [
          {
            id: 11,
            nombre: 'Lima Metropolitana',
            distritos: [
              { id: 111, nombre: 'Miraflores' },
              { id: 112, nombre: 'San Isidro' },
              { id: 113, nombre: 'Barranco' }
            ]
          },
          {
            id: 12,
            nombre: 'Huaral',
            distritos: [
              { id: 121, nombre: 'Chancay' },
              { id: 122, nombre: 'Aucallama' }
            ]
          }
        ]
      },
      {
        id: 2,
        nombre: 'Cusco',
        provincias: [
          {
            id: 21,
            nombre: 'Cusco',
            distritos: [
              { id: 211, nombre: 'San Sebastián' },
              { id: 212, nombre: 'Wanchaq' }
            ]
          }
        ]
      }
    ];
  }

  // Métodos para manejar cambios en los selectores
  onDepartmentChange(): void {
    this.provincias = this.selectedDepartment?.provincias || [];
    this.selectedProvince = null;
    this.distritos = [];
    this.selectedDistrict = null;

    this.currentNovedad.departamento = this.selectedDepartment?.nombre;
    this.currentNovedad.provincia = '';
    this.currentNovedad.distrito = '';
  }

  onProvinceChange(): void {
    this.distritos = this.selectedProvince?.distritos || [];
    this.selectedDistrict = null;

    this.currentNovedad.provincia = this.selectedProvince?.nombre;
    this.currentNovedad.distrito = '';
  }

  onDistrictChange(): void {
    this.currentNovedad.distrito = this.selectedDistrict?.nombre || '';
  }

  // Filtros
  onFilterDepartmentChange(): void {
    this.selectedFilterProvince = null;
    this.selectedFilterDistrict = null;
    this.filteredProvincias = this.selectedFilterDepartment?.provincias || [];
    this.filteredDistritos = [];
    this.applyFilters();
  }

  onFilterProvinceChange(): void {
    this.selectedFilterDistrict = null;
    this.filteredDistritos = this.selectedFilterProvince?.distritos || [];
    this.applyFilters();
  }

  onFilterDistrictChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.allNovedades];

    if (this.selectedFilterDepartment) {
      filtered = filtered.filter(n => n.departamento === this.selectedFilterDepartment?.nombre);
    }

    if (this.selectedFilterProvince) {
      filtered = filtered.filter(n => n.provincia === this.selectedFilterProvince?.nombre);
    }

    if (this.selectedFilterDistrict) {
      filtered = filtered.filter(n => n.distrito === this.selectedFilterDistrict?.nombre);
    }

    this.novedades = filtered;
    this.updateChart();
  }

  // Métodos del CRUD
  showAddDialog(): void {
    this.currentNovedad = this.emptyNovedad();
    this.selectedDepartment = null;
    this.selectedProvince = null;
    this.selectedDistrict = null;
    this.provincias = [];
    this.distritos = [];
    this.editMode = false;
    this.displayDialog = true;
  }

  showEditDialog(novedad: Novedad): void {
    this.currentNovedad = { ...novedad };

    if (novedad.departamento) {
      this.selectedDepartment = this.departamentos.find(d => d.nombre === novedad.departamento) ?? null;
      if (this.selectedDepartment) {
        this.provincias = this.selectedDepartment.provincias;
        
        if (novedad.provincia) {
          this.selectedProvince = this.provincias.find(p => p.nombre === novedad.provincia) ?? null;
          if (this.selectedProvince) {
            this.distritos = this.selectedProvince.distritos;
            
            if (novedad.distrito) {
              this.selectedDistrict = this.distritos.find(d => d.nombre === novedad.distrito) ?? null;
            }
          }
        }
      }
    }

    this.editMode = true;
    this.displayDialog = true;
  }

  saveNovedad(): void {
    if (this.editMode) {
      const index = this.allNovedades.findIndex(n => n.id === this.currentNovedad.id);
      if (index !== -1) {
        this.allNovedades[index] = { ...this.currentNovedad };
      }
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Novedad actualizada correctamente'
      });
    } else {
      const newId = Math.max(...this.allNovedades.map(n => n.id || 0)) + 1;
      this.currentNovedad.id = newId;
      this.allNovedades.push({ ...this.currentNovedad });
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Novedad creada correctamente'
      });
    }

    this.applyFilters();
    this.displayDialog = false;
  }

  deleteNovedad(id: number): void {
    this.allNovedades = this.allNovedades.filter(n => n.id !== id);
    this.applyFilters();
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Novedad eliminada correctamente'
    });
  }

  // Manejo de imágenes
  onFileSelect(event: any): void {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.currentNovedad.foto = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Gráficos
  updateChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('novedadesChart') as HTMLCanvasElement;
    const categoriaCounts: {[key: string]: number} = {
      evento: 0,
      noticia: 0,
      alerta: 0,
      anuncio: 0
    };

    this.novedades.forEach(novedad => {
      categoriaCounts[novedad.categoria]++;
    });

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Eventos', 'Noticias', 'Alertas', 'Anuncios'],
        datasets: [{
          label: 'Novedades por categoría',
          data: [categoriaCounts['evento'], categoriaCounts['noticia'], categoriaCounts['alerta'], categoriaCounts['anuncio']],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0'
          ],
          borderColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Distribución de Novedades por Categoría'
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
      }
    });
  }

  getCategoriaClass(categoria: string): string {
    switch (categoria) {
      case 'evento':
        return 'bg-purple-100 text-purple-800';
      case 'noticia':
        return 'bg-blue-100 text-blue-800';
      case 'alerta':
        return 'bg-red-100 text-red-800';
      case 'anuncio':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getCategoriaLabel(categoria: string): string {
    switch (categoria) {
      case 'evento':
        return 'Evento';
      case 'noticia':
        return 'Noticia';
      case 'alerta':
        return 'Alerta';
      case 'anuncio':
        return 'Anuncio';
      default:
        return categoria;
    }
  }
}