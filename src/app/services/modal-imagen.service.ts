import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo:'usuarios'|'medicos'|'hospitales' = 'usuarios';
  public id: string = '';
  public img: string = '';

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  /**
   * @name ocultarModal
   * @description Este método se utiliza para obtener el estado del modal.
   * @returns { boolean } - Retorna el estado actual del modal (true: visible, false: ocultado).
   */
  get ocultarModal(): boolean {
    return this._ocultarModal;
  };

  /**
   * @name abrirModal
   * @description Este método se utiliza para mostrar el modal.
   * @param { string } tipo - El tipo de usuario al que se abre el modal ('usuario', 'medicos', 'hospitales').
   * @param { string } id - El ID del usuario, médico o hospital al que se abre el modal.
   * @param { string } img - La URL de la imagen del usuario, médico o hospital al que se abre el modal (opcional).
   * @returns { void } - Cambia el estado del modal a visible.
   */
  abrirModal( 
    tipo: 'usuarios'|'medicos'|'hospitales', 
    id: string, 
    img: string = 'no-img', 
  ): void {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    if ( img.includes( 'https' ) ) {
      this.img = img;
    } else {
      this.img = `${ base_url }/upload/${ tipo }/${ img }`;
    };
  };

  /**
   * @name cerrarModal
   * @description Este método se utiliza para ocultar el modal.
   * @returns { void } - Cambia el estado del modal a ocultado.
   */
  cerrarModal(): void {
    this._ocultarModal = true;
  };

  constructor() { }
}
