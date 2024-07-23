/**
 * @interface _HospitalUser
 * @description Esta interfaz define la estructura de un objeto que representa un usuario asociado con un hospital.
 * @property { string } _id - El identificador único del usuario asociado con el hospital.
 * @property { string } nombre - El nombre del usuario asociado con el hospital.
 * @property { string } img - La URL de la imagen del usuario asociado con el hospital.
 */
interface _HospitalUser {
  _id: string,
  nombre: string,
  img: string,
};

export class Hospital {

  /**
   * @description Constructor de la clase Hospital que inicializa una instancia del hospital con sus propiedades correspondientes.
   * @param { string } nombre - El nombre del hospital.
   * @param { string } [ _id ] - El ID del hospital (opcional).
   * @param { string } [ img ] - La URL de la imagen del hospital (opcional).
   * @param { _HospitalUser } [ usuario ] - El usuario asociado con el hospital (opcional).
   */
  constructor(
    public nombre: string,
    public _id?: string,
    public img?: string,
    public usuario?: _HospitalUser,
  ) { }
}