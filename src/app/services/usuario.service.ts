import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuario.interface';

import { Usuario } from '../models/usuario.model';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public googleInitialized: boolean = false;
  public usuario!: Usuario;

  /**
  * @constructor
  * @description Inicializa el servicio inyectando una instancia de HttpClient, 
  * que se utiliza para realizar solicitudes HTTP.
  * @param { HttpClient } http - El cliente HTTP de Angular utilizado para enviar solicitudes HTTP al servidor.
  * @param { Router } router - El router de Angular utilizado para manejar la navegación entre rutas.
  * @param { NgZone } ngZone - El NgZone de Angular utilizado para mantener la interfaz de usuario actualizada.
  */
  constructor( 
    private http: HttpClient, 
    private router: Router,
    private ngZone: NgZone,
  ) { 
    this.initGoogle();
  }

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
  * @name uid
  * @description Devuelve el identificador único (UID) del usuario actual. Si el UID no está definido, retorna una cadena vacía.
  * @returns { string } El UID del usuario o una cadena vacía si no está definido.
  */
  get uid(): string {
    return this.usuario.uid || '';
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
   * @name initGoogle
   * @description Este método inicializa la biblioteca de autenticación de Google si está disponible. 
   * Configura el cliente de autenticación de Google con el `client_id` especificado. 
   * Si la biblioteca de Google no está cargada, registra un error en la consola.
   * @returns { Promise<void> } Una promesa que se resuelve cuando la biblioteca de Google está inicializada.
   */
  initGoogle(): Promise<void> {

    return new Promise( resolve => {
      google.accounts.id.initialize({
        client_id: '466980792623-5mu7ehr41mj5vq5ng5hhbdql54p4popn.apps.googleusercontent.com',
      });

      this.googleInitialized = true;
      resolve();
    });

  };

  /**
  * @name ensureGoogleInitialized
  * @description Este método garantiza que la biblioteca de autenticación de Google esté completamente inicializada
  * antes de realizar cualquier operación que dependa de ella. Retorna una promesa que se resuelve cuando la inicialización
  * está completa.
  * @returns { Promise<void> } Una promesa que se resuelve cuando la biblioteca de Google está inicializada.
  * @example
  * this.ensureGoogleInitialized().then(() => {
  *   // Realiza operaciones dependientes de Google aquí
  * });
  */
  ensureGoogleInitialized(): Promise<void> {

    return new Promise<void>(( resolve ) => {
      if ( this.googleInitialized ) {
        resolve();
      } else {
        const interval = setInterval(() => {
          if ( this.googleInitialized ) {
            clearInterval( interval );
            resolve();
          }
        }, 100);
      };
    });
  };

  /**
   * @name logout
   * @description Este método se encarga de eliminar el token almacenado en el localStorage.
   * Luego, redirecciona al usuario al inicio de sesión.
   * @returns { void } - No retorna ningún valor.
   */
  logout(): void {

    this.ensureGoogleInitialized().then(() => {
      const email = localStorage.getItem( 'email' ) || '';

      if ( email ) {
        google.accounts.id.revoke( email, () => {
          this.ngZone.run(() => {
            this.router.navigateByUrl( '/login' );
          });
          localStorage.removeItem( 'token' );
        });
      } else {
        console.warn( 'No se encontró ningún email en localStorage. Es posible que el usuario no esté autenticado en Google.' );
        this.ngZone.run(() => {
          this.router.navigateByUrl('/login');
        });
        localStorage.removeItem('token');
      };
    });
  };

  /**
  * @name validarToken
  * @description Este método se encarga de validar el token almacenado en el localStorage 
  * realizando una solicitud HTTP al servidor. Si el token es válido, se actualiza el token 
  * en el localStorage y el método retorna un Observable que emite `true`. Si ocurre un error, 
  * el Observable emite `false`.
  * @returns { Observable<boolean> } Un Observable que emite `true` si el token es válido y `false` en caso de error.
  */
  validarToken(): Observable<boolean> {

    return this.http.get( `${ base_url }/login/renew`, {
      headers: { 
        'x-token': this.token 
      }
    }).pipe(
      map(( resp: any ) => {
        // console.log( resp );

        const { name, email, img = '', google, role, uid, } = resp.usuario;

        this.usuario = new Usuario( name, email, '', img, google, role, uid, );
        localStorage.setItem( 'token', resp.token );

        return true;
      }),
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
  crearUsuario( formData: RegisterForm ): Observable<any> {
    return this.http.post( `${ base_url }/usuarios`, formData )
      .pipe( 
        tap(( resp: any ) => {
          localStorage.setItem( 'token', resp.token );
          // console.log( resp );
        })
      );
  };

  /**
  * @name actualizarPerfil
  * @description Este método envía una solicitud HTTP PUT para actualizar el perfil del usuario en el servidor.
  * Toma un objeto que contiene el correo electrónico y el nombre del usuario, y lo envía al endpoint correspondiente
  * de la API para actualizar los datos del usuario.
  * @param { Object } data - Un objeto que contiene las propiedades `email` y `name` del usuario.
  * @param { string } data.email - El correo electrónico del usuario.
  * @param { string } data.name - El nombre del usuario.
  * @param { string } data.role - El rol del usuario. Puede ser 'ADMIN_ROLE' o 'USER_ROLE'.
  * @returns { Observable<any> } - Retorna un observable que se puede suscribir para manejar la respuesta del servidor.
  * El observable emite la respuesta de la solicitud HTTP.
  */
  actualizarPerfil( data: { email: string, name: string, role: string } ): Observable<Object> {

    data = {
      ...data,
      role: this.usuario.role || 'USER_ROLE',
    };

    return this.http.put( `${ base_url }/usuarios/${ this.uid }`, data, {
      headers: { 
        'x-token': this.token 
      }
    });
  };

  /**
  * @name login
  * @description Este método envía una solicitud POST al servidor para autenticar a un usuario.
  * Utiliza los datos del formulario de inicio de sesión (`LoginForm`) y envía estos datos al endpoint `/login`.
  * @param { LoginForm } formData - Los datos del formulario de inicio de sesión que contienen 
  * el correo electrónico, la contraseña y el indicador de recordar al usuario.
  * @returns { Observable<any> } - Retorna un observable que emite la respuesta del servidor.
  */
  login( formData: LoginForm ): Observable<any> {
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
  loginGoogle( token: string ): Observable<any> {
    return this.http.post( `${ base_url }/login/google`, { token } )
      .pipe( 
        tap(( resp: any ) => {
          // console.log( resp );
          localStorage.setItem( 'token', resp.token );
        })
      );
  };

  /**
   * @name cargarUsuarios
   * @description Este método se encarga de cargar una lista de usuarios desde el servidor, empezando desde un índice especificado. Realiza una solicitud HTTP GET al endpoint correspondiente, utilizando los headers de autenticación. Devuelve un observable que emite los datos de los usuarios obtenidos del servidor. 
   * @param { number } from - El índice desde el cual comenzar a cargar los usuarios. Valor por defecto es 0. 
   * @returns { Observable<CargarUsuario> } - Un observable que emite la respuesta del servidor, la cual incluye los datos de los usuarios. 
   */
  cargarUsuarios( from: number = 0 ): Observable<CargarUsuario> {
    const url = `${ base_url }/usuarios/?from=${ from }`;
    return this.http.get<CargarUsuario>( url, this.headers )
      .pipe(
        map( resp => {
          const usuarios = resp.usuarios.map( 
            user => new Usuario( 
              user.name, user.email, '', user.img, user.google, user.role, user.uid 
            )
          );
          return { 
            total: resp.total,
            usuarios
          };
        })
      );
  };
}
