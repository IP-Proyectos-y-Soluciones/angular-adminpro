/**
 * @description Interfaz que define la estructura del formulario de registro.
 * Esta interfaz se utiliza para tipar el formulario reactivo en el componente de registro, 
 * garantizando que todos los campos necesarios estén presentes y con los tipos de datos correctos.
 * 
 * @property { string } name - Nombre del usuario.
 * @property { string } email - Dirección de correo electrónico del usuario.
 * @property { string } password - Contraseña del usuario.
 * @property { string } password2 - Confirmación de la contraseña del usuario.
 * @property { boolean } terms - Indica si el usuario ha aceptado los términos y condiciones.
 */
export interface RegisterForm{
  name: string;
  email: string;
  password: string;
  password2: string;
  terms: boolean;
};