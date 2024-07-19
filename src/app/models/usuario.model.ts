import { environment } from "../../environments/environment";

const base_url = environment.base_url;

export class Usuario{

  /**
   * @description Clase Usuario que representa a un usuario en la aplicación.
   * @param { String } name - El nombre del usuario.
   * @param { String } email - El correo electrónico del usuario.
   * @param { String } password - La contraseña del usuario (opcional).
   * @param { String } img La URL de la imagen del usuario (opcional).
   * @param { boolean } google - Indica si el usuario se registró mediante Google (opcional).
   * @param { String } role - El rol del usuario dentro de la aplicación.
   * @param { String } uid - El identificador único del usuario (opcional).
   */
  constructor (
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role: string = 'USER_ROLE',
    public uid?: string,
  ){};

  get imagenUrl(): string {
    // /api/upload/usuario/no-image

    if ( !this.img ) {
      return `${ base_url }/upload/usuarios/no-image`;
    };

    if ( this.img.includes( 'https' ) ) {
      return this.img;
    };

    return `${ base_url }/upload/usuarios/${ this.img }`;
  };
};