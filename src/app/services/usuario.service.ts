import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap } from 'rxjs/operators';

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
}
