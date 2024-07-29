import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Usuario } from '../../models/usuario.model';

import { BusquedasService } from '../../services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: ``
})
export class BusquedaComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];
  public usuarios: Usuario[] = [];

  /**
   * @constructor
   * @description Constructor del componente que se utiliza para inyectar las dependencias necesarias. 
   * En este caso, se inyectan el servicio `ActivatedRoute` para acceder a los parámetros de la ruta activa y el servicio `BusquedasService` 
   * para realizar búsquedas en el backend.
   * @param { ActivatedRoute } activatedRoute - Servicio de Angular que proporciona información sobre la ruta activa y sus parámetros.
   * @param { BusquedasService } busquedasService - Servicio personalizado que maneja las operaciones de búsqueda en el backend.
   */
  constructor(
    private activatedRoute: ActivatedRoute, 
    private busquedasService: BusquedasService, 
  ) { }

  /**
   * @name ngOnInit
   * @description Método del ciclo de vida del componente en Angular que se ejecuta una vez que el componente ha sido inicializado.
   * En este método, se suscribe a los parámetros de la ruta activa utilizando `ActivatedRoute` para obtener el término de búsqueda de la URL.
   * Cuando el parámetro `termino` cambia, se llama al método `busquedaGlobal` con el nuevo término de búsqueda.
   * @returns { void } - Este método no devuelve ningún valor.
   */
  ngOnInit (): void {
    this.activatedRoute.params
      .subscribe( ({ termino }) => this.busquedaGlobal( termino ) );
  };

  /**
   * @name busquedaGlobal
   * @description Este método realiza una búsqueda global utilizando un término de búsqueda y actualiza las propiedades del componente con los resultados obtenidos. 
   * Utiliza el servicio `busquedasService` para realizar la solicitud HTTP GET al servidor.
   * Cuando se recibe la respuesta, se asignan los resultados de la búsqueda a las propiedades `usuarios`, `medicos` y `hospitales` del componente.
   * También se imprime la respuesta completa en la consola para su verificación.
   * @param { string } termino - El término de búsqueda que se utilizará para buscar datos en el servidor.
   * @returns { void } - Este método no devuelve ningún valor.
   */
  busquedaGlobal( termino: string ): void {
    this.busquedasService.busquedaGlobal( termino )
      .subscribe( ( resp: any ) => {
        console.log( resp );
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
    });
  };

  abrirMedico( medico: Medico ) {

  };
}
