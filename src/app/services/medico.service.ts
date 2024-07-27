import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  /**
   * @constructor
   * @description Constructor del componente. Este método se llama al crear una nueva instancia de la clase. 
   * Se inyecta el servicio HttpClient que permite realizar solicitudes HTTP desde la aplicación.
   * @param { HttpClient } http - Servicio de Angular para realizar solicitudes HTTP.
   */
  constructor(
    private http: HttpClient, 
  ) { }

  /**
   * @name token
   * @description Este método obtiene el token almacenado en el localStorage del navegador. 
   * Si no se encuentra ningún token, devuelve una cadena vacía.
   * @returns { string } - El token de autenticación almacenado en el localStorage, o una cadena vacía si no se encuentra ningún token.
   */
  get token(): string {
    return localStorage.getItem( 'token' ) || '';
  };

  /**
   * @name headers
   * @description Este método devuelve un objeto de encabezados HTTP que incluyen un token de autenticación.
   * @returns { HttpHeaders } - Un objeto de encabezados HTTP que incluye un token de autenticación.
   */
  get headers(): HttpHeaders {
    return new HttpHeaders({
      'x-token': this.token
    });
  };

  /**
   * @name cargarMedicos
   * @description Este método realiza una solicitud HTTP GET al servidor para obtener una lista de médicos. 
   * La URL de la solicitud se construye utilizando una variable base de la URL (`base_url`). 
   * La solicitud incluye encabezados de autenticación. 
   * La respuesta del servidor, que contiene un objeto con una propiedad `medicos`, 
   * se transforma mediante un operador `map` para devolver solo la lista de médicos.
   * @returns { Observable<Medico[]> } - Un observable que emite un arreglo de objetos `Medico`.
   */
  cargarMedicos(): Observable<Medico[]> {
    const url = `${ base_url }/medicos`;
    return this.http.get<{ ok: boolean, medicos: Medico[] }>( url, { headers: this.headers } )
      .pipe(
        map( resp  => resp.medicos )
      );
  };

  /**
   * @name obtenerMedicoPorId
   * @description Este método realiza una solicitud HTTP GET al servidor para obtener la información de un médico específico utilizando su ID. 
   * La URL de la solicitud se construye utilizando una variable base de la URL (`base_url`) y el ID del médico. 
   * La solicitud incluye encabezados de autenticación. El método devuelve un observable que emite la información del médico obtenida del servidor.
   * @param { string } id - El ID del médico cuya información se desea obtener.
   * @returns { Observable<Medico> } - Un observable que emite la información del médico obtenida del servidor.
   */
  obtenerMedicoPorId( id: string ): Observable<Medico> {
    const url = `${ base_url }/medicos/${ id }`;
    return this.http.get<{ ok: boolean, medico: Medico }>( url, { headers: this.headers } )
      .pipe(
        map( resp  => resp.medico )
      );
  };

  /**
   * @name crearMedico
   * @description Este método realiza una solicitud HTTP POST al servidor para crear un nuevo médico. 
   * La URL de la solicitud se construye utilizando una variable base de la URL (`base_url`). 
   * La solicitud incluye encabezados de autenticación y envía los datos del médico en el cuerpo de la solicitud.
   * @param { { name: string, hospital: string } } medico - El objeto `Medico` que contiene los datos del nuevo médico que se va a crear.
   * @returns { Observable<Object> } - Un observable que emite la respuesta del servidor, la cual contiene la información del médico creado.
   */
  crearMedico( medico: { name: string, hospital: string } ): Observable<Object> {
    const url = `${ base_url }/medicos`;
    return this.http.post( url, medico, { headers: this.headers } );
  };

  /**
   * @name actualizarMedico
   * @description Este método realiza una solicitud HTTP PUT al servidor para actualizar la información de un médico existente. 
   * La URL de la solicitud se construye utilizando una variable base de la URL (`base_url`) y el ID del médico. 
   * La solicitud incluye encabezados de autenticación y envía los datos actualizados del médico en el cuerpo de la solicitud.
   * @param { Medico } medico - El objeto `Medico` que contiene los datos actualizados del médico que se va a actualizar.
   * @returns { Observable<Object> } - Un observable que emite la respuesta del servidor, la cual contiene la información del médico actualizado.
   */
  actualizarMedico( medico: Medico ): Observable<Object> {
    const url = `${ base_url }/medicos/${ medico._id }`;
    return this.http.put( url, medico, { headers: this.headers } );
  };

  /**
   * @name borrarMedico
   * @description Este método realiza una solicitud HTTP DELETE al servidor para eliminar un médico existente. 
   * La URL de la solicitud se construye utilizando una variable base de la URL (`base_url`) y el ID del médico. 
   * La solicitud incluye encabezados de autenticación para asegurar que solo usuarios autorizados puedan realizar la eliminación.
   * @param { string } _id - El ID del médico que se va a eliminar.
   * @returns { Observable<Object> } - Un observable que emite la respuesta del servidor tras la eliminación del médico.
   */
  borrarMedico( _id: string ): Observable<Object> {
    const url = `${ base_url }/medicos/${ _id }`;
    return this.http.delete( url, { headers: this.headers } );
  };
}
