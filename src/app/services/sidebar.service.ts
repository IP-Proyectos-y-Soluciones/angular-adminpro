import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [];

  /**
   * @name cargarMenu
   * @description Este método se encarga de cargar el menú desde el almacenamiento local del navegador (localStorage). 
   * Intenta obtener un elemento llamado 'menu' y, si existe, lo parsea desde una cadena JSON a un objeto JavaScript. 
   * Si no existe, se asigna un array vacío a la propiedad `menu`.
   * @returns { void } - Este método no devuelve ningún valor.
   */
  cargarMenu(): void {
    const menu = localStorage.getItem( 'menu' );
    this.menu = menu ? JSON.parse( menu ) : [];
  };

  // menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Main', url: '/' },
  //       { title: 'Graficas', url: 'grafica1' },
  //       { title: 'Perfil', url: 'perfil' },
  //       { title: 'ProgressBar', url: 'progress' },
  //       { title: 'Promesas', url: 'promesas' },
  //       { title: 'Rxjs', url: 'rxjs' },
  //     ]
  //   },

  //   {
  //     title: 'Mantenimientos',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Usuarios', url: 'usuarios' },
  //       { title: 'Hospitales', url: 'hospitales' },
  //       { title: 'Médicos', url: 'medicos' },
  //     ]
  //   }
  // ]

}
