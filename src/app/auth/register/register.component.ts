import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: [
      '',
      [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 30 ) ],
    ],
    email: [ 
      '', 
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
  }, {
    Validators: this.passwordsIguales( 'password', 'password2' ),
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
   * @name contrasenasNoValidas
   * @description Esta función verifica si las contraseñas ingresadas no son iguales.
   * @returns { boolean } - Retorna `true` si las contraseñas no coinciden, de lo contrario retorna `false`.
   */
  contrasenasNoValidas(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    return ( pass1 !== pass2 ) && this.formSubmitted;
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

  /**
   * @name passwordsIguales
   * @description Esta función es un validador personalizado para Angular Reactive Forms. 
   * Compara dos campos de contraseña dentro de un FormGroup y establece un error en el segundo campo si las contraseñas no coinciden.
   * Este validador se aplica a un FormGroup completo, no a un control individual.
   * @param pass1Name { string } - El nombre del primer campo de contraseña en el formulario.
   * @param pass2Name { string } - El nombre del segundo campo de contraseña en el formulario.
   * @returns { Function } - Retorna una función que toma un FormGroup como argumento. Esta función compara los valores de los dos campos de contraseña:
   *  - Si las contraseñas coinciden, elimina cualquier error en el segundo campo de contraseña.
   *  - Si las contraseñas no coinciden, establece un error `{ noEsIgual: true }` en el segundo campo de contraseña.
   * @example 
   * Uso en un formulario reactivo
   * this.form = this.fb.group({
   *   password: ['', Validators.required],
   *   confirmPassword: ['', Validators.required],
   * }, {
   *   validators: this.passwordsIguales('password', 'confirmPassword')
   * });
   */
  passwordsIguales ( pass1Name: string, pass2Name: string ) {
    
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get( pass1Name );
      const pass2Control = formGroup.get( pass2Name );

      if ( pass1Control && pass2Control ) {
        if ( pass1Control.value === pass2Control.value ) {
          pass2Control.setErrors( null );
        } else {
          pass2Control.setErrors({ noEsIgual: true });
        };
      };
    };
  };
}
