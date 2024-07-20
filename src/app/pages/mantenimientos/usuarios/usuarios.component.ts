import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

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
  public usuariosTemp: Usuario[] = [];

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
        this.usuariosTemp = usuarios;
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
   * @returns { Usuario[] | undefined } - Retorna la lista de usuarios filtrada según el término de búsqueda.
   */
  buscar( termino: string ): Usuario[] | undefined {

    if ( termino.length === 0 ) {
      return this.usuarios = this.usuariosTemp;
    };

    this.busquedasService.buscar( 'usuarios', termino )
      .subscribe( resultados => {
        this.usuarios = resultados;
      });
  };

  /**
   * @name eliminarUsuario
   * @description Este método se utiliza para eliminar un usuario de la lista de usuarios. Solicita confirmación al usuario antes de proceder con la eliminación. Si el usuario confirma, llama al método `usuarioService.eliminarUsuario` para eliminar el usuario del backend y actualiza la lista de usuarios mostrada.
   * @param { Usuario } usuario - Usuario que se desea eliminar.
   * @returns { void } - Elimina el usuario de la lista de usuarios y muestra una alerta con el resultado de la eliminación.
   */
  eliminarUsuario( usuario: Usuario ) {

    if ( usuario.uid === this.usuarioService.uid ) {
      return Swal.fire( 'Error', 'No puede borrarse a si mismo', 'error' );
    };

    Swal.fire({
      title: "¿Borrar usuario?",
      text: `Esta a punto de borrar a ${ usuario.name }`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, borrarlo"
    }).then((result) => {
      if (result.value) {
        this.usuarioService.elimianrUsuario( usuario )
          .subscribe( resp => {

            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado', 
              `${ usuario.name } fue elimindo correctamente`, 
              'success'
            );

          });
      };
    });
  };
}
