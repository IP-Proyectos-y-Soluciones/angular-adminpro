import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { LoginForm } from '../../interfaces/login-form.interface';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
})
export class LoginComponent implements AfterViewInit {

  @ViewChild( 'googleBtn' ) googleBtn!: ElementRef;

  public formSubmitted = false;
  public auth2: any;

  /**
  * @description Define un formulario reactivo para el inicio de sesión utilizando `FormBuilder`.
  * Inicializa los campos `email`, `password` y `rememberMe` con sus respectivos validadores.
  * El campo `email` se inicializa con el valor almacenado en `localStorage` (si existe).
  */
  public loginForm = this.fb.group({
    email: [ 
      localStorage.getItem( 'email' ) || '', 
      [ Validators.required, Validators.email ], 
    ],
    password: [ 
      '', 
      [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 16 ) ], 
    ],
    rememberMe: [ false ],
  });

  /**
  * @constructor
  * @description Este constructor inicializa el componente de registro.
  * Inyecta el servicio `Router` para manejar la navegación entre rutas, 
  * el `FormBuilder` para facilitar la creación y manejo de formularios reactivos 
  * en Angular, y `UsuarioService` para manejar las operaciones relacionadas 
  * con los usuarios.
  * @param router { Router } - Servicio utilizado para navegar entre rutas.
  * @param fb { FormBuilder } - Servicio que permite crear formularios reactivos 
  * y sus validaciones de manera más sencilla.
  * @param usuarioService { UsuarioService } - Servicio para manejar las operaciones 
  * relacionadas con los usuarios, como la creación de nuevos usuarios.
  */
  constructor( 
    private fb: FormBuilder,
    private router: Router, 
    private usuarioService: UsuarioService,
  ){}

  /**
  * @description Este método se ejecuta después de que Angular haya inicializado el componente.
  * En este caso, se utiliza para manejar la redirección al inicio de sesión cuando el usuario ya está autenticado.
  */
  ngAfterViewInit (): void {
    this.googleInit();
  };

  /**
  * @name googleInit
  * @description Este método inicializa la autenticación con Google. Configura el cliente de autenticación de Google
  * utilizando el `client_id` y establece el callback para manejar la respuesta de credenciales.
  * También renderiza el botón de inicio de sesión de Google en el elemento especificado.
  */
  googleInit() {
    google.accounts.id.initialize({
      client_id: '466980792623-5mu7ehr41mj5vq5ng5hhbdql54p4popn.apps.googleusercontent.com',
      callback: ( response: any ) => this.handleCredentialResponse( response ),
    });

    google.accounts.id.renderButton(
      // document.getElementById( "buttonDiv" ),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" } // customization attributes
    );
  };

  /**
  * @name handleCredentialResponse
  * @description Este método se ejecuta cuando se selecciona el botón de inicio de sesión con Google.
  * Obtiene el token de inicio de sesión de Google desde la respuesta y lo utiliza para realizar el login en el backend
  * utilizando el servicio `UsuarioService`. Si el login es exitoso, navega al dashboard.
  */
  handleCredentialResponse( response: any ) {
    // console.log( "Encoded JWT ID token: " + response.credential );
    this.usuarioService.loginGoogle( response.credential ).subscribe( resp => {
      // console.log({ login: resp });
      /**
      * Navegar al Dashboard
      */
      this.router.navigateByUrl( '/' );
    });
  };

  /**
  * @name login
  * @description Este método se ejecuta cuando se envía el formulario de inicio de sesión.
  * Valida el formulario y realiza el posteo de los datos al backend utilizando el servicio `UsuarioService`.
  * Si la respuesta del servidor es exitosa y la opción "Remember me" está seleccionada, almacena el correo electrónico en el `localStorage`.
  * Si "Remember me" no está seleccionada, elimina el correo electrónico del `localStorage`.
  * Navega al dashboard en caso de éxito y muestra un mensaje de error si ocurre un problema.
  */
  login() {
    
    this.usuarioService.login( this.loginForm.value as LoginForm )
      .subscribe( resp => {
      
      if ( this.loginForm.get( 'rememberMe' )?.value ) {
        const email = this.loginForm.get( 'email' )?.value ?? '';
        localStorage.setItem( 'email', email.toString() );
      } else {
        localStorage.removeItem( 'email' );
      };

      /**
      * Navegar al Dashboard
      */
      this.router.navigateByUrl( '/' );

    }, ( err ) => {
      /**
      * Si sucede un error
      */
      Swal.fire( 'Error', err.error.msg, 'error' );
    });
  };

}
