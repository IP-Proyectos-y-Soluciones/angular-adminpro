import { Component } from '@angular/core';

import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: ``
})
export class ModalImagenComponent {

  public imagenSubir: File = null as any;
  public imgTemp: string | null = null;

  constructor(
    public modalImagenService: ModalImagenService,  
  ) { }

  /**
   * @name cerrarModal
   * @description Este método se utiliza para cerrar el modal.
   * @returns { void } - Cierra el modal y cambia el estado de ocultar el modal a true.
   */
  cerrarModal(): void {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  };

  /**
   * @name camabiarImagen
   * @description Este método se encarga de manejar el evento de cambio de un input de tipo archivo, permitiendo al usuario seleccionar una imagen. Si se selecciona un archivo, se actualiza la propiedad `imagenSubir` con el archivo seleccionado y se genera una vista previa en base64 de la imagen, asignándola a la propiedad `imgTemp`. Si no se selecciona ningún archivo, se asegura de que `imgTemp` se establezca en null.
   * @param event - El evento disparado al cambiar el input de tipo archivo.
   * @returns { void } - Actualiza la imagen subida y genera una vista previa en base64 del archivo seleccionado.
   */
  cambiarImagen( event: Event ): null | undefined {

    const input = event.target as HTMLInputElement;

    if ( input.files && input.files.length > 0 ) {
      this.imagenSubir = input.files[0];
      // console.log( this.imagenSubir );

      if ( !input.files ) {
        return this.imgTemp = null;
      }

      const reader = new FileReader();
      reader.readAsDataURL( this.imagenSubir );

      reader.onloadend = () => {
        this.imgTemp = reader.result as string
        // console.log( reader.result );
      };
    } else {
      console.log( 'No se seleccionó ningún archivo.' );
    };
  };

}
