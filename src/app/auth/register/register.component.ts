import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  public registerForm = this.fb.group({
    name: [
      'Gerson Parra',
      [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 30 ) ],
    ],
    email: [ 'gerson2@correo.com', 
      [ Validators.required, Validators.email ], 
    ],
    password: [ '123456', 
      [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 16 ) ], 
    ],
    password2: [ '123456', 
      [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 16 ) ], 
    ],
    terms: [ false, Validators.required ],
  });

  constructor( private fb: FormBuilder ) {}

  /**
   * @name crearUsuario
   * @returns
   */
  crearUsuario() {
    console.log( this.registerForm.value );
  };
}
