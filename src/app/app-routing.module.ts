import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Módulos
import { PagesRountingModule } from './pages/pages.routing';

// Componentes
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [
  
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    PagesRountingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
