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
}
