import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../../layouts/navbar/navbar.component";
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-ciudadanos',
  imports: [BaseChartDirective],
  template: `
      <section class="ciudadanos">
      <button class="btn">
        <i class="pi pi-users"></i>
        <span>Miembros</span>
        <span>100,000</span>
      </button>
      <section class="informacion-ciudadanos">
        <div class="genero">
        <div class="hombre">
          <i class="bi bi-gender-male"></i>
          <span>50,000</span>
          </div>
          <div class="mujer">
          <i class="bi bi-gender-female"></i>
          <span>50,000</span>
          </div>
        </div>
        <div class="estado-civil">
          <h3>Soltero <span>1000</span></h3>
          <h3>Casado <span>500</span></h3>
          <h3>Divorciado <span>1300</span></h3>
          <h3>Viudo <span>1000</span></h3>
          <h3>Otro<span>1500</span></h3>
        </div>
      </section>
      </section>
      <section class="departamento-bar">
  <div class="chart-container" style="display: block;">
    <canvas baseChart
            [data]="barChartData"
            [options]="barChartOptions"
            chartType="bar">
    </canvas>
  </div>
</section>
      <section class="ciudadanos-char">
        <div class="chart-container" style="display: block;">
          <canvas baseChart
            [data]="lineChartData"
            [options]="lineChartOptions"
            chartType="line">
          </canvas>
        </div>
        </section>  
  `,
  styleUrl: './ciudadanos.component.scss',
})
export class CiudadanosComponent {

  lineChartData: ChartConfiguration<'line'>['data'] = {
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Ciudadanos registrados',
          fill: true,
          borderColor: '#007bff',
          backgroundColor: 'rgba(0,123,255,0.2)',
          tension: 0.3,
          type: 'line',
        }
      ]
    };
  
    lineChartOptions: ChartConfiguration<'line'>['options'] = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: true,
          text: 'Ciudadanos registrados por Día',
          font: {
            size: 20,
          }
        }
      }
    };
  
    ngOnInit(): void {
      // 🔢 Datos de ejemplo (puedes cambiar estas fechas y cantidades)
      const exampleData = [
        { date: '2025-04-01', count: 2 },
        { date: '2025-04-02', count: 5 },
        { date: '2025-04-03', count: 3 },
        { date: '2025-04-04', count: 7 },
        { date: '2025-04-05', count: 4 },
        { date: '2025-04-06', count: 16 },
      ];
  
      const labels = exampleData.map(d => d.date);
      const data = exampleData.map(d => d.count);
  
      this.lineChartData.labels = labels;
      this.lineChartData.datasets[0].data = data;

      const departamentoData = [
        { departamento: 'Lima', count: 50000 },
        { departamento: 'Arequipa', count: 25000 },
        { departamento: 'Cusco', count: 12000 },
        { departamento: 'La Libertad', count: 8000 },
        { departamento: 'Piura', count: 6000 }
      ];
      
      // Ordenar de mayor a menor
      const sortedData = departamentoData.sort((a, b) => b.count - a.count);
      
      this.barChartData.labels = sortedData.map(d => d.departamento);
      this.barChartData.datasets[0].data = sortedData.map(d => d.count);

    }


    barChartData: ChartConfiguration<'bar'>['data'] = {
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Ciudadanos por Departamento',
          backgroundColor: '#28a745'
        }
      ]
    };
    
    barChartOptions: ChartConfiguration<'bar'>['options'] = {
      responsive: true,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: true,
          text: 'Usuarios Registrados por Departamento',
          font: {
            size: 20
          }
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 14
            }
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              size: 14
            }
          }
        }
      }
    };
    

}
