import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

import { Chart, registerables } from 'chart.js';
import { MessageService } from 'primeng/api';
import { TaskService } from '../../services/task.service';
import { DepartamentoService } from '../../services/departamento.service';
import { InputTextModule } from 'primeng/inputtext';

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

interface Task {
  id?: number;
  title: string;
  description: string;
  department?: string;
  province?: string;
  district: string;
  status: 'pendiente' | 'en_progreso' | 'completada';
  dueDate: Date;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ToastModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    InputTextModule
  ],
  providers: [MessageService]
})
export class TareasComponent implements OnInit {

  selectedFilterDepartment: Departamento | null = null;
  selectedFilterProvince: Provincia | null = null;
  selectedFilterDistrict: Distrito | null = null;

  filteredProvincias: Provincia[] = [];
  filteredDistritos: Distrito[] = [];


  tasks: Task[] = [];
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  distritos: Distrito[] = [];
  
  selectedDepartment: any;
  selectedProvince: any;
  selectedDistrict: any;
  
  chart: any;

  // Form variables
  displayDialog: boolean = false;
  currentTask: Task = this.emptyTask();
  editMode: boolean = false;

  // Status options
  statusOptions = [
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'En Progreso', value: 'en_progreso' },
    { label: 'Completada', value: 'completada' }
  ];

  constructor(
    private taskService: TaskService,
    private departamentoService: DepartamentoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadDepartamentos();
    this.loadTasks();
    this.loadMockDepartamentos(); // Usaremos datos simulados
  }

  emptyTask(): Task {
    return {
      title: '',
      description: '',
      district: '',
      status: 'pendiente',
      dueDate: new Date()
    };
  }

  loadDepartamentos(): void {
    this.departamentoService.listarDepartamentos().subscribe({
      next: (departamentos) => {
        this.departamentos = departamentos;
      },
      error: (error) => {
        console.error('Error al cargar departamentos', error);
      }
    });
  }

  onDepartmentChange(): void {
    this.provincias = this.selectedDepartment?.provincias || [];
    this.selectedProvince = null;
    this.distritos = [];
    this.selectedDistrict = null;
    
    // Actualizar el modelo de la tarea
    this.currentTask.department = this.selectedDepartment?.nombre;
    this.currentTask.province = '';
    this.currentTask.district = '';
  }

  onProvinceChange(): void {
    this.distritos = this.selectedProvince?.distritos || [];
    this.selectedDistrict = null;
    
    // Actualizar el modelo de la tarea
    this.currentTask.province = this.selectedProvince?.nombre;
    this.currentTask.district = '';
  }

  onDistrictChange(): void {
    // Actualizar el modelo de la tarea
    this.currentTask.district = this.selectedDistrict?.nombre;
  }

  allTasks: Task[] = [];

loadTasks(): void {
  this.taskService.getAllTasks().subscribe({
    next: (data) => {
      this.allTasks = data;
      this.tasks = [...data];
      this.updateChart();
    },
    error: (error) => {
      console.error('Error loading tasks', error);
    }
  });
}

filterByDistrict(): void {
  if (this.selectedFilterDistrict) {
    this.tasks = this.allTasks.filter(task => task.district === this.selectedFilterDistrict!.nombre);
  } else {
    this.tasks = [...this.allTasks];
  }
  this.updateChart();
}

    
  showAddDialog(): void {
    this.currentTask = this.emptyTask();
    this.selectedDepartment = null;
    this.selectedProvince = null;
    this.selectedDistrict = null;
    this.provincias = [];
    this.distritos = [];
    this.editMode = false;
    this.displayDialog = true;
  }

  showEditDialog(task: Task): void {
    this.currentTask = { ...task };
    
    // Buscar y establecer los valores seleccionados para edición
    if (task.department) {
      this.selectedDepartment = this.departamentos.find(d => d.nombre === task.department);
      if (this.selectedDepartment) {
        this.provincias = this.selectedDepartment.provincias;
        
        if (task.province) {
          this.selectedProvince = this.provincias.find(p => p.nombre === task.province);
          if (this.selectedProvince) {
            this.distritos = this.selectedProvince.distritos;
            
            if (task.district) {
              this.selectedDistrict = this.distritos.find(d => d.nombre === task.district);
            }
          }
        }
      }
    }
    
    this.editMode = true;
    this.displayDialog = true;
  }

  // Resto de los métodos permanecen iguales...
  saveTask(): void {
    if (this.editMode) {
      this.taskService.updateTask(this.currentTask).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Tarea actualizada correctamente'
          });
          this.loadTasks();
          this.displayDialog = false;
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar tarea'
          });
        }
      });
    } else {
      this.taskService.createTask(this.currentTask).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Tarea creada correctamente'
          });
          this.loadTasks();
          this.displayDialog = false;
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al crear tarea'
          });
        }
      });
    }
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Tarea eliminada correctamente'
        });
        this.loadTasks();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al eliminar tarea'
        });
      }
    });
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('taskChart') as HTMLCanvasElement;
    const statusCounts = {
      pendiente: 0,
      en_progreso: 0,
      completada: 0
    };

    this.tasks.forEach(task => {
      statusCounts[task.status]++;
    });

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Pendientes', 'En Progreso', 'Completadas'],
        datasets: [{
          data: [statusCounts.pendiente, statusCounts.en_progreso, statusCounts.completada],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#4BC0C0'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#4BC0C0'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Estado de Tareas'
          }
        }
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'en_progreso':
        return 'bg-blue-100 text-blue-800';
      case 'completada':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'pendiente':
        return 'Pendiente';
      case 'en_progreso':
        return 'En Progreso';
      case 'completada':
        return 'Completada';
      default:
        return status;
    }
  }

  loadMockDepartamentos(): void {
    this.departamentos = [
      {
        id: 1,
        nombre: 'Lima',
        provincias: [
          {
            id: 11,
            nombre: 'Lima Metropolitana',
            distritos: [
              { id: 111, nombre: 'Miraflores' },
              { id: 112, nombre: 'San Isidro' }
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

  onFilterDepartmentChange(): void {
    this.selectedFilterProvince = null;
    this.selectedFilterDistrict = null;
    this.filteredProvincias = this.selectedFilterDepartment?.provincias || [];
    this.filteredDistritos = [];
    this.tasks = [...this.allTasks]; // Reinicia
  }
  
  onFilterProvinceChange(): void {
    this.selectedFilterDistrict = null;
    this.filteredDistritos = this.selectedFilterProvince?.distritos || [];
    this.tasks = [...this.allTasks]; // Reinicia
  }
  
  
}