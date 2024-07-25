import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';

import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: ``
})
export class MedicosComponent implements OnInit {

  public cargando: boolean = true;
  public medicos: Medico[] = [];

  /**
   * @constructor
   * @description Constructor del componente que se utiliza para inyectar los servicios necesarios en la clase del componente. 
   * El constructor recibe dos servicios: `MedicoService` para la gestión de datos de médicos y `ModalImagenService` 
   * para la manipulación de modales de imágenes. Estos servicios se inyectan a través de la dependencia del constructor para ser utilizados 
   * en los métodos del componente.
   * @param { MedicoService } medicoService - Servicio encargado de las operaciones relacionadas con los médicos, como obtener, crear, actualizar y eliminar médicos.
   * @param { ModalImagenService } modalImagenService - Servicio encargado de la gestión de imágenes en los modales, permitiendo abrir y manipular modales de imagen.
   */
  constructor(
    private medicoService: MedicoService, 
    private modalImagenService: ModalImagenService, 
  ) { }

  /**
   * @name ngOnInit
   * @description Este método es parte del ciclo de vida del componente en Angular. Se ejecuta una vez que Angular ha inicializado todas las propiedades de entrada del componente. 
   * En este caso, se utiliza para cargar la lista de médicos llamando al método `cargarMedicos`.
   * @returns { void } - Este método no devuelve ningún valor.
   */
  ngOnInit (): void {
    this.cargarMedicos();
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
