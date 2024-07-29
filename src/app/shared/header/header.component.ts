import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    private usuarioService: UsuarioService, 
    private router: Router,  
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

  /**
   * @name buscar
   * @description Este método redirige al usuario a una página de resultados de búsqueda dentro de la aplicación. 
   * Utiliza el servicio `router` para navegar a la ruta de búsqueda especificada, pasando el término de búsqueda como parte de la URL. 
   * Esto permite actualizar la vista y mostrar los resultados de la búsqueda correspondiente al término ingresado por el usuario.
   * @param { string } termino - El término de búsqueda que se desea buscar.
   * @returns { void } - Este método no devuelve ningún valor.
   */
  buscar( termino: string ): void {
    if ( termino.length === 0 ) {
      return;
    };

    this.router.navigateByUrl( `/dashboard/buscar/${ termino }` );
  };
}
