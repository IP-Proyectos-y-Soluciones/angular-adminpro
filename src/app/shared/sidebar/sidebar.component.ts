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

  public usuario: Usuario;

  /**
   * @constructor
   * @description Constructor del componente. Se utiliza para inyectar los servicios `SidebarService` y `UsuarioService` en la clase del componente.
   * Además, se inicializa la propiedad `usuario` con el valor proporcionado por el servicio `UsuarioService` al momento de crear una instancia del componente.
   * @param sidebarService - Servicio utilizado para gestionar y cargar el menú lateral del componente.
   * @param usuarioService - Servicio utilizado para gestionar la información del usuario. 
   */
  constructor( 
    public sidebarService: SidebarService, 
    private usuarioService: UsuarioService,  
  ) {
    this.usuario = this.usuarioService.usuario;
  };
}
