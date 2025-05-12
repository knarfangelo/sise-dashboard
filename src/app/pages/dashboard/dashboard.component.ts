import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../../layouts/navbar/navbar.component";
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, BaseChartDirective],
  template: `
      <section class="moderadores">
      <button class="btn">
        <i class="pi pi-users"></i>
        <span>Gestores</span>
        <span>100</span>
      </button>
      <button class="btn">
        <i class="pi pi-users"></i>
        <span>Distritales</span>
        <span>100</span>
      </button>
      <button class="btn">
        <i class="pi pi-users"></i>
        <span>Provinciales</span>
        <span>40</span>
      </button>
      <button class="btn">
        <i class="pi pi-users"></i>
        <span>Departamentales</span>
        <span>50</span>
      </button>
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
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
 
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Miembros registrados',
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
        text: 'Miembros registrados por Día',
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
      { date: '2025-04-06', count: 6 },
    ];

    const labels = exampleData.map(d => d.date);
    const data = exampleData.map(d => d.count);

    this.lineChartData.labels = labels;
    this.lineChartData.datasets[0].data = data;
  }

}