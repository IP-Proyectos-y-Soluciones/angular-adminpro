import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: [
      'User Test',
      [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 30 ) ],
    ],
    email: [ 
      'test@correo.com', 
      [ Validators.required, Validators.email ], 
    ],
    password: [ 
      '', 
      [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 16 ) ], 
    ],
    password2: [ 
      '', 
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
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if ( this.registerForm.valid ) {
      console.log( 'Posteando formulario' );
    } else {
      console.log( 'Formulario no es correcto' );
    };
  };

  /**
   * @name campoNoValido
   * @description Esta función verifica si un campo específico del formulario es inválido y si el formulario ha sido enviado.
   * Se utiliza para realizar validaciones personalizadas y mostrar mensajes de error en la interfaz de usuario.
   * - `this.registerForm.get( campo ).invalid`: Verifica si el campo es inválido.
   * - `this.formSubmitted`: Verifica si el formulario ha sido enviado.
   * Si ambas condiciones se cumplen, la función retorna `true`, indicando que el campo es inválido y debe mostrarse un mensaje de error.
   * Si alguna de las condiciones no se cumple, la función retorna `false`, indicando que no hay errores en el campo o el formulario no ha sido enviado.
   * @param campo { string } - El nombre del campo del formulario que se va a validar.
   * @returns { boolean } - Retorna `true` si el campo es inválido y el formulario ha sido enviado, de lo contrario retorna `false`.
   */
  campoNoValido( campo: string ):boolean {
    const control = this.registerForm.get( campo );
    return control ? control.invalid && this.formSubmitted : false;
  };

  /**
   * @name aceptaTerminos
   * @description Esta función verifica si los términos fueron aceptados.
   * @returns { boolean } - Retorna `true` si los términos no fueron aceptados, de lo contrario retorna `false`.
   */
  aceptaTerminos(): boolean {
    const terms = this.registerForm.get( 'terms' )?.value;
    return !terms && this.formSubmitted;
  };
}
