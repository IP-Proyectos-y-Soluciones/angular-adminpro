/**
 * @description Esta interfaz define la estructura de los datos que se utilizan 
 * para el formulario de inicio de sesión (login). 
 * Contiene tres propiedades:
 * 
 * @property { string } email - Dirección de correo electrónico del usuario.
 * @property { string } password - Contraseña del usuario.
 * @property { boolean } rememberMe - Indicador de si el usuario desea que sus credenciales sean recordadas.
 */
export interface LoginForm{
  email: string;
  password: string;
  rememberMe: boolean;
};