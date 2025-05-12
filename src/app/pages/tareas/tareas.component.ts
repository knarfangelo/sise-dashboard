import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-tareas',
  imports: [CommonModule, FormsModule, TableModule],
  template: `

  <section class="contenedor">
    
  
  </section>

  <section class="contenedor">
    <p-table [value]="products" [tableStyle]="{'min-width': '60rem'}">
        <ng-template #header>
            <tr>
                <th pSortableColumn="code" style="width:20%">
                    Code <p-sortIcon field="code" />
                </th>
                <th pSortableColumn="name" style="width:20%">
                    Name <p-sortIcon field="name" />
                </th>
                <th pSortableColumn="category" style="width:20%">
                    Category <p-sortIcon field="category" />
                </th>
                <th pSortableColumn="quantity" style="width:20%">
                    Quantity <p-sortIcon field="quantity" />
                </th>
            </tr>
        </ng-template>
        <ng-template #body let-product>
            <tr>
                <td>{{ product.code }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.quantity }}</td>
            </tr>
        </ng-template>
    </p-table>
  </section>
  
  
  `,
  styleUrl: './tareas.component.scss',
})
export class TareasComponent {

  products: any[] = [
    { code: 'A1001', name: 'Product A', category: 'Category 1', quantity: 10 },
    { code: 'A1002', name: 'Product B', category: 'Category 2', quantity: 20 },
    { code: 'A1003', name: 'Product C', category: 'Category 1', quantity: 15 },
    { code: 'A1004', name: 'Product D', category: 'Category 3', quantity: 5 },
    { code: 'A1005', name: 'Product E', category: 'Category 2', quantity: 30 },
    { code: 'A1006', name: 'Product F', category: 'Category 1', quantity: 25 },
    { code: 'A1007', name: 'Product G', category: 'Category 3', quantity: 12 },
    { code: 'A1008', name: 'Product H', category: 'Category 2', quantity: 18 },
    { code: 'A1009', name: 'Product I', category: 'Category 1', quantity: 22 },
    { code: 'A1010', name: 'Product J', category: 'Category 3', quantity: 8 },
    { code: 'A1011', name: 'Product K', category: 'Category 2', quantity: 14 },
    { code: 'A1012', name: 'Product L', category: 'Category 1', quantity: 28 },
  ]
}
