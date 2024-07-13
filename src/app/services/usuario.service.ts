import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /**
  * @name constructor
  * @description Inicializa el servicio inyectando una instancia de HttpClient, 
  * que se utiliza para realizar solicitudes HTTP.
  * @param { HttpClient } http - El cliente HTTP de Angular utilizado para enviar solicitudes HTTP al servidor.
  */
  constructor( private http: HttpClient ) { }

  /**
  * @name validarToken
  * @description Este método se encarga de validar el token almacenado en el localStorage 
  * realizando una solicitud HTTP al servidor. Si el token es válido, se actualiza el token 
  * en el localStorage y el método retorna un Observable que emite `true`. Si ocurre un error, 
  * el Observable emite `false`.
  * @returns { Observable<boolean> } Un Observable que emite `true` si el token es válido y `false` en caso de error.
  */
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem( 'token' ) || '';

    return this.http.get( `${ base_url }/login/renew`, {
      headers: { 
        'x-token': token 
      }
    }).pipe(
      tap(( resp: any ) => {
        localStorage.setItem( 'token', resp.token );
        // console.log( resp );
      }),
      map(( resp: any )  => true ),
      catchError( error => of( false ))
    );
  };

  /**
  * @name crearUsuario
  * @description Este método envía una solicitud HTTP POST para crear un nuevo usuario en el servidor.
  * Toma los datos del formulario de registro y los envía al endpoint correspondiente de la API.
  * @param { RegisterForm } formData - Los datos del formulario de registro que contienen el nombre, correo electrónico, 
  * contraseña, confirmación de contraseña y aceptación de términos.
  * @returns { Observable<any> } - Retorna un observable que se puede suscribir para manejar la respuesta del servidor.
  */
  crearUsuario( formData: RegisterForm ) {
    return this.http.post( `${ base_url }/usuarios`, formData )
      .pipe( 
        tap(( resp: any ) => {
          localStorage.setItem( 'token', resp.token );
          // console.log( resp );
        })
      );
  };

  /**
  * @name login
  * @description Este método envía una solicitud POST al servidor para autenticar a un usuario.
  * Utiliza los datos del formulario de inicio de sesión (`LoginForm`) y envía estos datos al endpoint `/login`.
  * @param { LoginForm } formData - Los datos del formulario de inicio de sesión que contienen 
  * el correo electrónico, la contraseña y el indicador de recordar al usuario.
  * @returns { Observable<any> } - Retorna un observable que emite la respuesta del servidor.
  */
  login( formData: LoginForm ) {
    return this.http.post( `${ base_url }/login`, formData )
      .pipe( 
        tap(( resp: any ) => {
          localStorage.setItem( 'token', resp.token );
          // console.log( resp );
        })
      );
  };

  /**
  * @name loginGoogle
  * @description Este método envía una solicitud POST al servidor para autenticar a un usuario utilizando Google.
  * Utiliza el token de inicio de sesión de Google y envía este token al endpoint `/login/google`.
  * @param { string } token - El token de inicio de sesión de Google.
  */
  loginGoogle( token: string ) {
    return this.http.post( `${ base_url }/login/google`, { token } )
      .pipe( 
        tap(( resp: any ) => {
          // console.log( resp );
          localStorage.setItem( 'token', resp.token );
        })
      );
  };
}
