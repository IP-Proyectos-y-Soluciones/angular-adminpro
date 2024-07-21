import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';

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
    public fileUploadService: FileUploadService,
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

  /**
   * @name subirImagen
   * @description Este método se encarga de subir la imagen seleccionada al servidor. Primero, verifica si el ID de usuario (`uid`) está definido. Si no lo está, muestra un mensaje de error mediante SweetAlert y termina la ejecución. Si el `uid` está definido, llama al servicio `fileUploadService` para subir la imagen. Una vez subida la imagen, actualiza la propiedad `img` del usuario con el nombre de la imagen devuelto por el servidor.
   * @returns { void }
   */
  subirImagen(): void {

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    if ( !id ) {
      console.error( 'El ID de usuario no está definido.' );
      Swal.fire( 'Error', 'El ID de usuario no está definido.', 'error' );
      return;
    };

    this.fileUploadService
      .actualizarFoto( this.imagenSubir, tipo, id )
      .then( img => {
        Swal.fire( 'Guardado', 'Imagen de usuario actualizada', 'success' );

        this.modalImagenService.nuevaImagen.emit( img );

        this.cerrarModal();
      }).catch( err => {
        console.log( err );
        Swal.fire( 'Error', 'No se pudo subir la imagen', 'error' );
      });
  };

}
