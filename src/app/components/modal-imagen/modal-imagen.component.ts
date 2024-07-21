import { Component } from '@angular/core';

import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: ``
})
export class ModalImagenComponent {

  constructor(
    public modalImagenService: ModalImagenService,  
  ) { }

  /**
   * @name cerrarModal
   * @description Este método se utiliza para cerrar el modal.
   * @returns { void } - Cierra el modal y cambia el estado de ocultar el modal a true.
   */
  cerrarModal(): void {
    this.modalImagenService.cerrarModal();
  };

}
