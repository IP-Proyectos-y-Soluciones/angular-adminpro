import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Hospital } from '../models/hospital.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  
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
   * @description Este método devuelve un objeto HttpHeaders con el token de autenticación (`x-token`).
   * @returns { HttpHeaders } - Un objeto HttpHeaders con el token de autenticación.
   */
  get headers(): HttpHeaders {
    return new HttpHeaders({
      'x-token': this.token
    });
  };

   /**
   * @name cargarHospitales
   * @description Carga la lista de hospitales desde el servidor.
   * @returns { Observable<Hospital[]> } - Un observable que emite una lista de hospitales.
   */
  cargarHospitales(): Observable<Hospital[]> {
    const url = `${ base_url }/hospitales`;
    return this.http.get<{ ok: boolean, hospitales: Hospital[] }>( url, { headers: this.headers } )
      .pipe(
        map( resp  => resp.hospitales )
      );
  };

  /**
   * @name crearHospital
   * @description Este método envía una solicitud POST al servidor para crear un nuevo hospital con el nombre proporcionado. La solicitud incluye un token de autenticación en los encabezados para asegurar que el usuario esté autenticado.
   * @param { string } name - El nombre del nuevo hospital que se desea crear.
   * @returns { Observable<any> } - Un observable que emite la respuesta del servidor. Esta respuesta puede incluir los detalles del hospital creado o un mensaje de confirmación de la operación.
   */
  crearHospital( name: string ): Observable<any> {
    const url = `${ base_url }/hospitales`;
    return this.http.post( url, { name }, { headers: this.headers } );
  };

  /**
   * @name actualizarHospital
   * @description Este método envía una solicitud PUT al servidor para actualizar el nombre de un hospital existente. La solicitud incluye un token de autenticación en los encabezados para asegurar que el usuario esté autenticado.
   * @param { string } _id - El identificador único del hospital que se desea actualizar.
   * @param { string } name - El nuevo nombre del hospital.
   * @returns { Observable<any> } - Un observable que emite la respuesta del servidor. Esta respuesta puede incluir un mensaje de confirmación de la operación.
   */
  actualizarHospital( _id: string, name: string ): Observable<any> {
    const url = `${ base_url }/hospitales/${ _id }`;
    return this.http.put( url, { name }, { headers: this.headers } );
  };

  /**
   * @name borrarHospital
   * @description Este método envía una solicitud DELETE al servidor para eliminar un hospital existente. La solicitud incluye un token de autenticación en los encabezados para asegurar que el usuario esté autenticado.
   * @param { string } _id - El identificador único del hospital que se desea eliminar.
   * @returns { Observable<any> } - Un observable que emite la respuesta del servidor. Esta respuesta puede incluir un mensaje de confirmación de la operación.
   */
  borrarHospital( _id: string ): Observable<any> {
    const url = `${ base_url }/hospitales/${ _id }`;
    return this.http.delete( url, { headers: this.headers } );
  };
}
