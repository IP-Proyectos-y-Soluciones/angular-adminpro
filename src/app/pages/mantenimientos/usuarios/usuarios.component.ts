import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``
})
export class UsuariosComponent implements OnInit {
  
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];

  /**
   * @constructor
   * @description Inicializa el componente `PerfilComponent` inyectando las dependencias necesarias. En este caso, se inyecta el servicio `UsuarioService` para manejar las operaciones relacionadas con el usuario, como obtener los datos del usuario actual.
   * @param { UsuarioService } usuarioService - Servicio para manejar las operaciones relacionadas con el usuario. 
   */
  constructor(
    private usuarioService: UsuarioService,
  ) {}
  
  ngOnInit (): void {
    this.usuarioService.cargarUsuarios( 0 )
      .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
      });
  };
}
