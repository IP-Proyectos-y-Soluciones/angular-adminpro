import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { LoginForm } from '../../interfaces/login-form.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [ 
      'test16@correso.com', 
      [ Validators.required, Validators.email ], 
    ],
    password: [ 
      '123456', 
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
    private router: Router, 
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
  ){}

  login() {
    
    this.usuarioService.login( this.loginForm.value as LoginForm )
      .subscribe( resp => {
      console.log( resp )
    }, ( err ) => {
      /**
      * Si sucede un error
      */
      Swal.fire( 'Error', err.error.msg, 'error' );
    });
    // this.router.navigateByUrl('/');
  };

}
