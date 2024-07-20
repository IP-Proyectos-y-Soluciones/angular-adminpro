import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: ``
})
export class ModalImagenComponent {

  public ocultarModal: boolean = false;

  /**
   * @name cerrarModal
   * @description Este método se ejecuta cuando se desea cerrar el modal.
   * @returns { void } - Cierra el modal y elimina la clase que lo oculta.
   */
  cerrarModal(): void {
    this.ocultarModal = true;
  };

}
