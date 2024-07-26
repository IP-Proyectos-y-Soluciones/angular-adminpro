import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Medico } from '../../../models/medico.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: ``
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs: Subscription = new Subscription();

  /**
   * @constructor
   * @description Constructor del componente que se utiliza para inyectar los servicios necesarios en la clase del componente. 
   * El constructor recibe dos servicios: `MedicoService` para la gestión de datos de médicos y `ModalImagenService` 
   * para la manipulación de modales de imágenes. Estos servicios se inyectan a través de la dependencia del constructor para ser utilizados 
   * en los métodos del componente.
   * @param { MedicoService } medicoService - Servicio encargado de las operaciones relacionadas con los médicos, como obtener, crear, actualizar y eliminar médicos.
   * @param { ModalImagenService } modalImagenService - Servicio encargado de la gestión de imágenes en los modales, permitiendo abrir y manipular modales de imagen.
   * @param { BusquedasService } busquedasService - Servicio encargado de la búsqueda de médicos por nombre.
   */
  constructor(
    private medicoService: MedicoService, 
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
   * @description Este método es parte del ciclo de vida del componente en Angular. Se ejecuta una vez que Angular ha inicializado todas las propiedades de entrada del componente. 
   * En este caso, se utiliza para cargar la lista de médicos llamando al método `cargarMedicos`.
   * Además, se suscribe a un observable `nuevaImagen` del servicio `modalImagenService` para recargar la lista de médicos cuando se recibe una nueva imagen, con un retraso de 100 ms.
   * @returns { void } - Este método no devuelve ningún valor.
   */
  ngOnInit (): void {
    this.cargarMedicos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe( delay( 100 ) )
      .subscribe( img => {
      this.cargarMedicos(); 
    });
  };

  /**
   * @name cargarMedicos
   * @description Este método se encarga de cargar la lista de médicos desde el servicio `MedicoService`. 
   * Primero, establece la propiedad `cargando` en `true` para indicar que se está realizando una carga de datos. 
   * Luego, llama al método `cargarMedicos` del servicio `MedicoService`, que realiza una solicitud HTTP para obtener la lista de médicos. 
   * Una vez que se recibe la respuesta, se actualiza la propiedad `medicos` con los datos recibidos y se establece `cargando` en `false` para indicar que la carga ha finalizado.
   * @returns { void } - Este método no devuelve ningún valor.
   */
  cargarMedicos(): void {
    this.cargando = true;
    this.medicoService.cargarMedicos()
     .subscribe( medicos => {
        this.cargando = false;
        this.medicos = medicos;
      });
  };

  /**
   * @name buscar
   * @description Este método se utiliza para buscar médicos por nombre utilizando el servicio `BusquedasService`. 
   * Si el término de búsqueda está vacío, se llama al método `cargarMedicos` para cargar todos los médicos. 
   * De lo contrario, se utiliza el servicio `BusquedasService` para realizar la búsqueda y actualizar la lista de médicos 
   * con los resultados obtenidos.
   * @param { string } termino - El término de búsqueda utilizado para encontrar médicos.
   * @returns { void } - Este método no devuelve ningún valor.
   */
  buscar( termino: string ): void {
    if ( termino.length === 0 ) {
      return this.cargarMedicos();
    };

    this.busquedasService.buscar( 'medicos', termino )
      .subscribe( ( resultados: Medico[] ) => {
        this.medicos = resultados;
      });
  };

  /**
   * @name abrirModal
   * @description Este método se encarga de abrir un modal para gestionar las imágenes asociadas a un médico. 
   * Primero, verifica si el médico tiene un ID definido. Si el ID está presente, llama al método `abrirModal` del servicio `ModalImagenService` 
   * pasando el tipo de entidad ('medicos'), el ID del médico y la imagen asociada. Si el ID no está definido, muestra una alerta de error 
   * utilizando `Swal.fire` indicando que el médico no tiene un ID definido.
   * @param { Medico } medico - El objeto `Medico` cuyos datos de imagen serán gestionados en el modal.
   * @returns { void } - Este método no devuelve ningún valor.
   */
  abrirModal( medico: Medico ): void {

    if ( medico._id ) {
      this.modalImagenService.abrirModal( 'medicos', medico._id, medico.img );
    } else {
      Swal.fire( 'Error', 'El medico no tiene ID definido', 'error' );
    };
  };
}
