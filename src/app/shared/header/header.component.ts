import { Component } from '@angular/core';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

  public usuario: Usuario;

  /**
  * @constructor
  * @description Este constructor inicializa el servicio inyectando una instancia de `UsuarioService`.
  * `UsuarioService` es utilizado para manejar todas las operaciones relacionadas con los usuarios, 
  * como la autenticación y la gestión de datos de usuario.
  * @param { UsuarioService } usuarioService - El servicio encargado de las operaciones relacionadas con los usuarios.
  */
  constructor( 
    private usuarioService: UsuarioService 
  ) { 
    this.usuario = this.usuarioService.usuario;
  }

  /**
   * @name logout
   * @description Este método maneja la lógica de logout de un usuario.
   * Se utiliza el método `logout` del servicio `UsuarioService` para eliminar el token de autenticación.
   * @returns { void } - No retorna ningún valor.
   */
  logout(): void {
    this.usuarioService.logout();
  };

}
