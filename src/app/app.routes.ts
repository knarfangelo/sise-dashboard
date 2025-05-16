import { Routes } from '@angular/router';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CiudadanosComponent } from './pages/ciudadanos/ciudadanos.component';
import { MantenimientoCiudadanosComponent } from './pages/ciudadanos/mantenimientoCiudadanos/mantenimientoCiudadanos.component';
import { RedesComponent } from './pages/redes/redes.component';
import { MiembroComponent } from './pages/miembro/miembro.component';
import { SemaforosComponent } from './pages/semaforos/semaforos.component';
import { TareasComponent } from './pages/tareas/tareas.component';
import { UsuariosComponent } from './pages/Usuarios/Usuarios.component';
import { TableMantenimientoComponent } from './pages/ciudadanos/mantenimientoCiudadanos/tableMantenimiento/tableMantenimiento.component';
import { NovedadesComponent } from './pages/novedades/novedades.component';

export const routes: Routes = [

    { path: '', component:NavbarComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component:DashboardComponent },
            { path: 'ciudadanos', component:CiudadanosComponent },
            { path: 'mantenimiento-ciudadanos', component:MantenimientoCiudadanosComponent },
            { path: 'redes', component: RedesComponent},
            { path: 'redes/:dni', component:MiembroComponent },
            { path: 'semaforos', component:SemaforosComponent },
            { path: 'tareas', component:TareasComponent },
            { path: 'usuarios', component:UsuariosComponent },
            { path: 'novedades', component:NovedadesComponent },
        ]
    },


];
