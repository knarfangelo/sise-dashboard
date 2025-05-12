import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, PLATFORM_ID } from '@angular/core';
import { NavbarComponent } from "../../../layouts/navbar/navbar.component";
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FloatLabel } from "primeng/floatlabel"
import { InputText } from 'primeng/inputtext';
import { TableMantenimientoComponent } from "./tableMantenimiento/tableMantenimiento.component";
import { Checkbox } from 'primeng/checkbox';
import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'app-mantenimiento-ciudadanos',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, FloatLabel, InputText, TableMantenimientoComponent, Checkbox, ChartModule],
  template: `

        <section class="contenedor buscador">
        <p-chart type="pie" [data]="data" [options]="options" class="pie" />
    <div class="busqueda">
    <p-floatlabel variant="on">
        <input pInputText id="on_label" [(ngModel)]="value2" autocomplete="off" />
        <label for="on_label">Nombre</label>
    </p-floatlabel>
    <p-floatlabel variant="on">
        <input pInputText id="on_label" [(ngModel)]="value2" autocomplete="off" />
        <label for="on_label">Apellido Paterno</label>
    </p-floatlabel>
    <p-floatlabel variant="on">
        <input pInputText id="on_label" [(ngModel)]="value2" autocomplete="off" />
        <label for="on_label">Apellido Materno</label>
    </p-floatlabel>
    </div>

    <div class="busqueda-pais">
    <p-floatlabel variant="on">
        <input pInputText id="on_label" [(ngModel)]="value2" autocomplete="off" />
        <label for="on_label">Departamento</label>
    </p-floatlabel>
    <p-floatlabel variant="on">
        <input pInputText id="on_label" [(ngModel)]="value2" autocomplete="off" />
        <label for="on_label">Provincia</label>
    </p-floatlabel>
    <p-floatlabel variant="on">
        <input pInputText id="on_label" [(ngModel)]="value2" autocomplete="off" />
        <label for="on_label">Distrito</label>
    </p-floatlabel>
    </div>
    <div class="contenedor-checkbox">
    <div class="flex items-center">
    <p-checkbox inputId="ingredient1" name="pizza" value="Cheese" [(ngModel)]="pizza" />
    <label for="ingredient1" class="ml-2"> Aprobados </label>
</div>
<div class="flex items-center">
    <p-checkbox inputId="ingredient2" name="pizza" value="Mushroom" [(ngModel)]="pizza" />
    <label for="ingredient2" class="ml-2"> En revisión </label>
</div>
<div class="flex items-center">
    <p-checkbox inputId="ingredient3" name="pizza" value="Pepper" [(ngModel)]="pizza" />
    <label for="ingredient3" class="ml-2"> Rechazados </label>
</div>
</div>

        </section>
        <section class="contenedor tabla">
          <app-table-mantenimiento></app-table-mantenimiento>
        </section>

  `,
  styleUrl: './mantenimientoCiudadanos.component.scss',
})
export class MantenimientoCiudadanosComponent {

  pizza: string[] = [];
  value1: string = '';
  value2: string = '';

  data: any;

    options: any;

    platformId = inject(PLATFORM_ID);

    constructor(private cd: ChangeDetectorRef) {}



    ngOnInit() {
        this.initChart();
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');

            this.data = {
                labels: ['Aprobados', 'En revisión', 'Rechazados'], // Etiquetas de cada segmento
                datasets: [
                    {
                        data: [150, 100, 70],
                        backgroundColor: [
                          'rgb(146, 255, 131)',
                          'rgb(255, 255, 131)',
                          'rgb(255, 131, 131)'
                        ],
                    }
                     
                ]
            };

            this.options = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: textColor
                        }
                    }
                }
            };
            this.cd.markForCheck()
        }

    }
}
