import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  /**
   * @constructor
   * @description Inicializa una instancia del servicio inyectando el cliente HTTP de Angular. El cliente HTTP se utiliza para realizar solicitudes HTTP a las API del backend.
   * @param { HttpClient } http - El cliente HTTP de Angular, utilizado para realizar solicitudes HTTP.
   */
  constructor(
    private http: HttpClient, 
  ) { }

  /**
   * @name token
   * @description Este getter obtiene el token de autenticación almacenado en el localStorage.
   * Si no hay un token en el localStorage, retorna una cadena vacía.
   * @returns { string } - El token de autenticación del usuario.
   */
  get token(): string {
    return localStorage.getItem( 'token' ) || '';
  };

  /**
   * @name headers
   * @description Este método devuelve un objeto con los encabezados HTTP que incluyen un token de autenticación (`x-token`). Este token se utiliza para autenticar las solicitudes HTTP al servidor. El método accede a la propiedad `token` del servicio para obtener el valor del token actual.
   * @returns { object } - Un objeto que contiene los encabezados HTTP necesarios para la autenticación.
   */
  get headers(): object {
    return {
      headers: {
        'x-token': this.token
      }
    };
  };

  /**
   * @name transformarUsuarios
   * @description Este método transforma los datos de usuarios obtenidos del servidor en instancias de la clase `Usuario`.
   * Recibe un array de objetos con la información de los usuarios y crea una nueva instancia de `Usuario` para cada objeto.
   * Esto facilita el manejo de usuarios en la aplicación, asegurando que todos los usuarios tengan una estructura consistente.
   * @param { any[] } resultados - Array de objetos que representan los datos de los usuarios obtenidos del servidor.
   * @returns { Usuario[] } - Retorna un array de instancias de la clase `Usuario`.
   */
  private transformarUsuarios( resultados: any[] ): Usuario[] {

    return resultados.map(
      user => new Usuario( user.name, user.email, '', user.img, user.google, user.role, user.uid )
    );
  };

  /**
   * @name buscar
   * @description Este método se encarga de realizar una búsqueda en el backend para los usuarios, médicos o hospitales que coincidan con el término de búsqueda especificado. Hace una solicitud HTTP GET al endpoint correspondiente y utiliza los headers de autenticación. Devuelve un observable que se puede suscribir para manejar la respuesta del servidor. El observable emite la respuesta de la solicitud HTTP con la lista de coincidencias.
   * @param { 'usuarios'|'medicos'|'hospitales' } tipo - El tipo de entidad a la que se busca coincidencias.
   * @param { string } termino - El término de búsqueda.
   * @returns { Observable<any> } - Retorna un observable que emite la respuesta del servidor con la lista de coincidencias.
   */
  buscar( tipo: 'usuarios'|'medicos'|'hospitales', termino: string ): Observable<any> {
    const url = `${ base_url }/todo/collection/${ tipo }/${ termino }`;
    return this.http.get<any[]>( url, this.headers )
      .pipe(
        map( ( resp: any ) => {

          switch ( tipo ) {
            case 'usuarios':
              return this.transformarUsuarios( resp.resultados );
          
            default:
              return [];
          };
        })
      );
  };
}