export class Usuario{

  /**
   * @description Clase Usuario que representa a un usuario en la aplicación.
   * @param { String } name - El nombre del usuario.
   * @param { String } email - El correo electrónico del usuario.
   * @param { String } password - La contraseña del usuario (opcional).
   * @param { String } img La URL de la imagen del usuario (opcional).
   * @param { String } google - Indica si el usuario se registró mediante Google (opcional).
   * @param { String } role - El rol del usuario dentro de la aplicación (opcional).
   * @param { String } uid - El identificador único del usuario (opcional).
   */
  constructor (
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string,
  ){}
};