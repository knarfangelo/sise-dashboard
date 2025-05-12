import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-semaforos',
  imports: [InputTextModule, FormsModule,FloatLabel, FormsModule, SelectModule],
  template: `

    <section class="contenedor">
      <h1>PERÚ</h1>
      <div class="configuracion">
      <p-select [options]="cities" [(ngModel)]="selectedCity" placeholder="Departamento" [editable]="true" optionLabel="name" class="w-full md:w-56" />
      <p-select [options]="cities" [(ngModel)]="selectedCity" placeholder="Provincia" [editable]="true" optionLabel="name" class="w-full md:w-56" />
      <button class="buscar">Buscar</button>
      <button class="limpiar">Limpiar</button>
      <button class="editar">Editar</button>
      </div>
    </section>
    <section class="contenedor config-semaforo">
      <div class="info">
      <div class="info__item">
          <h2>Total Provincia</h2>
          <p>100,000</p>
        </div>
        <div class="info__item">
          <h2>Total para Ganar</h2>
          <p>54,000</p>
        </div>
        <div class="info__item">
          <h2>Total Conseguido</h2>
          <p>20,000</p>
        </div>
        <div class="info__item">
          <h2>Rojo</h2>
          <p>33%</p>
        </div>
        <div class="info__item">
          <h2>Amarillo</h2>
          <p>66%</p>
        </div>
        <div class="info__item">
          <h2>Verde</h2>
          <p>100%</p>
        </div>
      </div>  
      <div class="c-semaforo">
      <img src="icons/semaforo.svg" class="semaforo" alt="semaforo">
      </div>      
    </section>

    <section class="contenedor">
      <h1>LIMA METROPOLITANA</h1>
      <div class="configuracion">
      <p-select [options]="cities" [(ngModel)]="selectedCity" placeholder="Departamento" [editable]="true" optionLabel="name" class="w-full md:w-56" />
      <p-select [options]="cities" [(ngModel)]="selectedCity" placeholder="Provincia" [editable]="true" optionLabel="name" class="w-full md:w-56" />
      <p-select [options]="cities" [(ngModel)]="selectedCity" placeholder="Distrital" [editable]="true" optionLabel="name" class="w-full md:w-56" />
      <button class="buscar">Buscar</button>
      <button class="limpiar">Limpiar</button>
      <button class="editar">Editar</button>
      </div>
    </section>
    <section class="contenedor config-semaforo">
      <div class="info">
      <div class="info__item">
          <h2>Total Provincia</h2>
          <p>100,000</p>
        </div>
        <div class="info__item">
          <h2>Total para Ganar</h2>
          <p>54,000</p>
        </div>
        <div class="info__item">
          <h2>Total Conseguido</h2>
          <p>20,000</p>
        </div>
        <div class="info__item">
          <h2>Rojo</h2>
          <p>33%</p>
        </div>
        <div class="info__item">
          <h2>Amarillo</h2>
          <p>66%</p>
        </div>
        <div class="info__item">
          <h2>Verde</h2>
          <p>100%</p>
        </div>
      </div>  
      <div class="c-semaforo">
      <img src="icons/semaforo.svg" class="semaforo" alt="semaforo">
      </div>      
    </section>

    
  `,
  styleUrl: './semaforos.component.scss',
})
export class SemaforosComponent {

  filtroNombre: string = '';

  cities: any[] | undefined;

  selectedCity: any | undefined;

  ngOnInit() {
      this.cities = [
          { name: 'New York', code: 'NY' },
          { name: 'Rome', code: 'RM' },
          { name: 'London', code: 'LDN' },
          { name: 'Istanbul', code: 'IST' },
          { name: 'Paris', code: 'PRS' }
      ];
  }

}
