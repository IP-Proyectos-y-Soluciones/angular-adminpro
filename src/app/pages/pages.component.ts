import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ``
})
export class PagesComponent implements OnInit {

  /**
   * @constructor
   * @description Constructor del componente. Se utiliza para inyectar los servicios `SettingsService` y `SidebarService` en la clase del componente.
   * `SettingsService` es un servicio que maneja la configuración de la aplicación, mientras que `SidebarService` es responsable de la gestión del menú lateral.
   * @param { SettingsService } settingService - Servicio encargado de manejar la configuración de la aplicación.
   * @param { SidebarService } sidebarService - Servicio encargado de gestionar el menú lateral.
   */
  constructor( 
    private settingService: SettingsService, 
    private sidebarService: SidebarService,  
  ) { }

  /**
   * @name ngOnInit
   * @description Método que forma parte del ciclo de vida del componente en Angular. Se ejecuta después de que Angular haya inicializado todas las propiedades del componente.
   * En este método se inicializan funciones personalizadas y se carga el menú lateral utilizando el `SidebarService`.
   * @returns { void } - Este método no devuelve ningún valor.
   */
  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();
    // console.log( this.sidebarService.menu );
  };
}
