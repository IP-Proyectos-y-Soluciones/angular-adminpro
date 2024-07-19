import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public from: number = 0;
  public cargando: boolean = true;

  /**
   * @constructor
   * @description Inicializa el componente `PerfilComponent` inyectando las dependencias necesarias. En este caso, se inyecta el servicio `UsuarioService` para manejar las operaciones relacionadas con el usuario, como obtener los datos del usuario actual.
   * @param { UsuarioService } usuarioService - Servicio para manejar las operaciones relacionadas con el usuario.
   */
  constructor(
    private usuarioService: UsuarioService, 
    private busquedasService: BusquedasService, 
  ) {}

  /**
   * @name ngOnInit
   * @description Este método se ejecuta después de que Angular inicializa el componente. En este caso, se utiliza para cargar la lista de usuarios desde el inicio.
   *
   */
  ngOnInit (): void {
    this.cargarUsuarios();
  };

  /**
   * @name cargarUsuarios
   * @description Este método se utiliza para cargar la lista de usuarios en la página actual. Llama al servicio `UsuarioService` para obtener la lista de usuarios desde la posición `from` hasta el final de la lista. Almacena el resultado en la propiedad `usuarios` y actualiza el número total de usuarios.
   * @returns { void } - Actualiza la lista de usuarios y el número total de usuarios. 20 usuarios se cargan por página. 30 usuarios son mostrados por página en la vista.
   */
  cargarUsuarios(): void {
    this.cargando = true;

    this.usuarioService.cargarUsuarios( this.from )
      .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.cargando = false;
      });
  };

  /**
   * @name cambiarPagina
   * @description Este método se utiliza para cambiar la página de la lista de usuarios. Ajusta el valor de `from` (que indica el índice del primer usuario en la nueva página) según el parámetro `valor`. Asegura que `from` no sea negativo ni mayor que el número total de usuarios. Luego llama al método `cargarUsuarios` para actualizar la lista de usuarios mostrada.
   * @param valor - Número de posiciones que se desea desplazar en la lista de usuarios. Puede ser positivo (avanzar) o negativo (retroceder).
   */
  cambiarPagina( valor: number ): void {
    this.from += valor;

    if ( this.from < 0 ) {
      this.from = 0;
    } else if ( this.from > this.totalUsuarios ) {
      this.from -= valor;
    };

    this.cargarUsuarios();
  };

  /**
   * @name buscar
   * @description Este método se utiliza para buscar usuarios en la lista de usuarios. Llama al servicio `BusquedasService` para realizar la búsqueda en el backend utilizando el término proporcionado y almacena el resultado en la propiedad `usuarios`. Esto permite filtrar la lista de usuarios según el término de búsqueda.
   * @param { string } termino - Cadena de texto que se utiliza para buscar usuarios.
   */
  buscar( termino: string ): void {
    this.busquedasService.buscar( 'usuarios', termino )
      .subscribe( resultados => {
        this.usuarios = resultados;
      });
  };
}
