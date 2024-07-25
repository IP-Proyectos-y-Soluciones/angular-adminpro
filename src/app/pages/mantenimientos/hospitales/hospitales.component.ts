import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: ``
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription = new Subscription();

  constructor(
    private hospitalService: HospitalService, 
    private modalImagenService: ModalImagenService, 
    private busquedasService: BusquedasService, 
  ) { }

  /**
   * @name ngOnDestroy
   * @description Este método se ejecuta cuando el componente se destruye. Es parte del ciclo de vida de un componente de Angular.
   * Utiliza este método para realizar una limpieza adecuada y liberar recursos. En este caso, se llama al método `unsubscribe` 
   * del objeto `imgSubs` para cancelar cualquier suscripción activa y evitar fugas de memoria.
   * @returns { void } - Este método no devuelve ningún valor.
   */
  ngOnDestroy (): void {
    this.imgSubs.unsubscribe();
  };

  /**
   * @name ngOnInit 
   * @description Este método se ejecuta cuando se inicia el componente. Carga la lista de hospitales desde el servicio.
   * @returns { void } - Este método se ejecuta cuando se inicia el componente. Se carga la lista de hospitales desde el servicio. 20 hospitales se cargan por página, y 30 hospitales son mostrados por página en la vista. 20 hospitales se cargan por página, y 30 hospitales son mostrados por página en la vista.
   */
  ngOnInit (): void {
    this.cargarHospitales();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay( 100 )
      )
      .subscribe( img => {
        this.cargarHospitales(); 
      });
  };

  /**
   * @name buscar
   * @description Este método realiza una búsqueda de hospitales basado en el término proporcionado. 
   * Si el término de búsqueda es una cadena vacía, se carga la lista completa de hospitales llamando al método `cargarHospitales`. 
   * Si se proporciona un término de búsqueda, se hace una solicitud a `busquedasService` para buscar hospitales que coincidan con el término. 
   * Los resultados de la búsqueda se suscriben y se asignan a la propiedad `hospitales` del componente.
   * @param { string } termino - El término de búsqueda utilizado para filtrar los hospitales. 
   * @returns { void } - Este método no devuelve ningún valor.
   */
  buscar( termino: string ): void {
    if ( termino.length === 0 ) {
      return this.cargarHospitales();
    };

    this.busquedasService.buscar( 'hospitales', termino )
      .subscribe( ( resultados: Hospital[] ) => {
        this.hospitales = resultados;
      });
  };

  /**
   * @name cargarHospitales
   * @description Carga la lista de hospitales desde el servicio y emite la lista al componente padre.
   * @returns { void } - Este método se ejecuta cuando se carga la lista de hospitales desde el servicio.
   */
  cargarHospitales(): void {
    this.cargando = true;

    this.hospitalService.cargarHospitales()
      .subscribe( hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
      });
  };

  /**
   * @name guardarCambios
   * @description Este método se utiliza para guardar los cambios en el nombre de un hospital.
   * Primero, verifica que el hospital tenga un ID y un nombre definidos. 
   * Si ambos están presentes, llama al servicio `actualizarHospital` para enviar los cambios al servidor. 
   * Luego, muestra una alerta de éxito utilizando `Swal.fire`. 
   * Si el hospital no tiene un ID o un nombre definidos, muestra una alerta de error.
   * @param { Hospital } hospital - El hospital cuyos datos serán actualizados.
   * @returns { void } - Este método no devuelve ningún valor.
   */
  guardarCambios( hospital: Hospital ): void {
    if ( hospital._id && hospital.name ) {
      this.hospitalService.actualizarHospital( hospital._id, hospital.name )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', hospital.name, 'success' );
        });
    } else {
      Swal.fire( 'Error', 'El hospital no tiene ID o nombre definido', 'error' );
    };
  };

  /**
   * @name eliminarHospital
   * @description Este método se utiliza para eliminar un hospital. 
   * Primero, verifica que el hospital tenga un ID definido. 
   * Si el ID está presente, llama al servicio `borrarHospital` para eliminar el hospital en el servidor. 
   * Después de completar la solicitud, actualiza la lista de hospitales llamando al método `cargarHospitales` y muestra una alerta de éxito utilizando `Swal.fire`. 
   * Si el hospital no tiene un ID definido, muestra una alerta de error.
   * @param { Hospital } hospital - El hospital que se va a eliminar.
   * @returns { void } - Este método no devuelve ningún valor.
   */
  eliminarHospital( hospital: Hospital ): void {
    if ( hospital._id ) {
      this.hospitalService.borrarHospital( hospital._id )
        .subscribe( resp => {
          this.cargarHospitales();  // Actualiza la lista de hospitales después de eliminar un hospital.
          Swal.fire( 'Eliminado', hospital.name, 'success' );
        });
    } else {
      Swal.fire( 'Error', 'El hospital no tiene ID definido', 'error' );
    };
  };

  /**
   * @name abrirSweetAlert
   * @description Este método abre una alerta modal utilizando SweetAlert2 para agregar un nuevo hospital. 
   * El usuario debe ingresar el nombre del hospital en un campo de texto dentro de la alerta. 
   * Si el nombre del hospital es válido (no vacío y con longitud mayor a cero), se envía una solicitud al servidor 
   * para crear el hospital mediante el método `crearHospital` del servicio `HospitalService`. 
   * Si la creación es exitosa, el nuevo hospital se agrega a la lista de hospitales y se muestra una alerta de éxito. 
   * Si el nombre del hospital es inválido, se muestra una alerta de error.
   * @returns { Promise<void> } - Este método no devuelve ningún valor, pero retorna una Promesa que resuelve cuando se completa la acción.
   */
  async abrirSweetAlert(): Promise<void> {
    const { value = '' } = await Swal.fire<string>({
      title: "Agregar Hospital",
      text: "Ingrese el nombre del hospital",
      icon: "info",
      input: "text",
      inputPlaceholder: "Nombre del Hospital",
      showCancelButton: true,
      confirmButtonText: "Agregar Hospital",
      cancelButtonText: "Cancelar"
    });
    if ( value && value.trim().length > 0 ) {
      this.hospitalService.crearHospital( value )
        .subscribe( ( resp: any ) => {
          this.hospitales.push( resp.hospital );
        });
    } else {
      // Swal.fire( 'Error', 'El nombre del hospital no puede estar vacío', 'error' );
    };
  };

  /**
   * @name abrirModal
   * @description Este método se utiliza para abrir un modal que permite la gestión de imágenes asociadas a un hospital. 
   * Primero, verifica que el hospital tenga un ID definido. 
   * Si el ID está presente, llama al servicio `ModalImagenService` para abrir el modal con la información del hospital. 
   * Si el hospital no tiene un ID definido, muestra una alerta de error utilizando `Swal.fire`.
   * @param { Hospital } hospital - El hospital cuyos datos de imagen serán gestionados.
   * @returns { void } - Este método no devuelve ningún valor.
   */
  abrirModal( hospital: Hospital ): void {
    // console.log( hospitales );

    if ( hospital._id ) {
      this.modalImagenService.abrirModal( 'hospitales', hospital._id, hospital.img );
    } else {
      Swal.fire( 'Error', 'El hospital no tiene ID definido', 'error' );
    };
  };
}
