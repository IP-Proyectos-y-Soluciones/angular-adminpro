import { Component } from '@angular/core';

import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

  public menuItems: any[];
  public usuario: Usuario;

  constructor( 
    private sidebarServive: SidebarService, 
    private usuarioService: UsuarioService,  
  ) {
    this.menuItems = this.sidebarServive.menu;
    this.usuario = this.usuarioService.usuario;
  };
}
