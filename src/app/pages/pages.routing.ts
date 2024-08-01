import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard, canMatch } from '../guards/auth.guard';

// Componentes
import { PagesComponent } from './pages.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    canMatch: [ canMatch ],
    loadChildren: () => import( './child-routes.module' ).then( m => m.ChildRoutesModule ),
  },
];

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ],
})
export class PagesRountingModule {}
