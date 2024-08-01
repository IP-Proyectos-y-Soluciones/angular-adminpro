import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Componentes
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Mantenimientos
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

// Guards
import { adminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de cuenta' } },
  { path: 'buscar/:termino', component: BusquedaComponent, data: { title: 'Busquedas' } },
  { path: 'grafica1', component: Grafica1Component, data: { title: 'Gráfica #1' } },
  { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de Usuario' } },
  { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar' } },
  { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },

  // Mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data: { title: 'Mantenimiento de Hospitales' } },
  { path: 'medico/:id', component: MedicoComponent, data: { title: 'Mantenimiento de Médicos' } },
  { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenimiento de Médicos' } },

  // Rutas de Admin
  { path: 'usuarios', canActivate: [ adminGuard ], component: UsuariosComponent, data: { title: 'Mantenimiento de Usuarios' } },
]

@NgModule({
  imports: [ RouterModule.forChild( childRoutes ) ],
  exports: [ RouterModule ],
})
export class ChildRoutesModule { }
