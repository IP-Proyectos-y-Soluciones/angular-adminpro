import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;

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
   * @returns { void } - Cambia el estado del modal a visible.
   */
  abrirModal(): void {
    this._ocultarModal = false;
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
