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

  handleCredentialResponse( response: any ) {
    // console.log( "Encoded JWT ID token: " + response.credential );
    this.usuarioService.loginGoogle( response.credential ).subscribe( resp => {
      // console.log({ login: resp });
      this.router.navigateByUrl('/');
    });
  };

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
      this.router.navigateByUrl('/');

    }, ( err ) => {
      /**
      * Si sucede un error
      */
      Swal.fire( 'Error', err.error.msg, 'error' );
    });
  };

}
