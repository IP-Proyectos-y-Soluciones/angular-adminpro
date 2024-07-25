import { Hospital } from "./hospital.model";

/**
 * @interface _MedicoUser
 * @description Interfaz que define la estructura de un usuario médico. Esta interfaz se utiliza para tipar la información del usuario relacionado con un médico en la aplicación.
 * @property { string } _id - Identificador único del usuario médico.
 * @property { string } nombre - Nombre del usuario médico.
 * @property { string } img - URL de la imagen del usuario médico.
 */ 
interface _MedicoUser {
  _id: string,
  nombre: string,
  img: string,
};

/**
 * @name Medico
 * @description Clase que representa un médico. Contiene propiedades para el nombre, ID, imagen, usuario y hospital asociado.
 */
export class Medico {

  /**
   * @name constructor
   * @description Constructor de la clase Medico que inicializa las propiedades del médico.
   * @param { string } name - Nombre del médico.
   * @param { string } [ _id ] - Identificador único del médico (opcional).
   * @param { string } [ img ] - URL de la imagen del médico (opcional).
   * @param { _MedicoUser } [ usuario ] - Información del usuario médico (opcional).
   * @param { Hospital } [ hospital ] - Hospital asociado al médico (opcional).
   */
  constructor(
    public name: string,
    public _id?: string,
    public img?: string,
    public usuario?: _MedicoUser,
    public hospital?: Hospital,
  ) { }
}