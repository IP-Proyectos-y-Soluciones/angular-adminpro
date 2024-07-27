import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';
import { Medico } from '../../../models/medico.model';

import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: ``
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado?: Medico;
  public hospitalSeleccionado?: Hospital;

  /**
   * @constructor
   * @description Constructor del componente. Se utiliza para inyectar el servicio `FormBuilder` en la clase del componente.
   * `FormBuilder` es un servicio proporcionado por Angular que facilita la creación y gestión de formularios reactivos.
   * En este caso, el `FormBuilder` se utiliza para generar el formulario de médicos.
   * @param { FormBuilder } fb - Servicio `FormBuilder` para generar el formulario de médicos.
   */
  constructor(
    private fb: FormBuilder, 
    private hospitalService: HospitalService, 
    private medicoService: MedicoService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
  ) { }

  /**
   * @name ngOnInit
   * @description Este método es parte del ciclo de vida del componente en Angular. Se ejecuta una vez que Angular ha inicializado todas las propiedades de entrada del componente. 
   * En este caso, se utiliza para inicializar el formulario reactivo `medicoForm` utilizando el servicio `FormBuilder`.
   * El formulario se compone de dos controles: `name` y `hospital`, ambos con valores predeterminados y validadores de requisitos obligatorios.
   * `name` se inicializa con el valor 'Carlos Sanchez' y el validador `Validators.required`, mientras que `hospital` se inicializa con el valor '2' y también tiene el validador `Validators.required`.
   * @returns { void } - Este método no devuelve ningún valor.
   */
  ngOnInit (): void {

    this.activatedRoute.params.subscribe( ({ id }) => this.cargarMedico( id ) );

    this.medicoForm = this.fb.group({
      name: [ 
        '', 
        Validators.required, 
      ],
      hospital: [
        '', 
        Validators.required,
      ]
    });

    this.cargarHospitales();

    this.medicoForm.get( 'hospital' )?.valueChanges
      .subscribe( hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find( hospital => hospital._id === hospitalId );
      });
  };

  cargarMedico( id: string ) {
    this.medicoService.obtenerMedicoPorId( id )
      .subscribe( medico => {
        console.log( medico );
        this.medicoSeleccionado = medico;
      });
  };

  /**
   * @name cargarHospitales
   * @description Este método se encarga de cargar la lista de hospitales desde el backend utilizando el servicio `hospitalService`. 
   * La respuesta del servicio se suscribe para obtener un array de objetos `Hospital`. Una vez que los datos son recibidos, 
   * se actualiza la propiedad `hospitales` del componente con la lista de hospitales obtenida, y se imprime en la consola para su verificación.
   * Este método es útil para llenar una lista desplegable de hospitales en la interfaz de usuario.
   * @returns { void } - Este método no devuelve ningún valor.
   */ 
  cargarHospitales(): void {
    this.hospitalService.cargarHospitales()
      .subscribe( ( hospitales: Hospital[] ) => {
        this.hospitales = hospitales;
      });
  };

  /**
   * @name guardarMedico
   * @description Este método se encarga de guardar el médico en el backend utilizando el servicio `medicoService`.
   * La respuesta del servicio se suscribe para obtener un objeto `Medico`. Una vez que los datos son recibidos, 
   * se muestra un mensaje de éxito utilizando `Swal` y se navega a la página de detalle del médico utilizando el método `router.navigateByUrl`.
   * Este método es útil para crear un nuevo médico en el backend y mostrar un mensaje de éxito al usuario.
   * @returns { void } - Este método no devuelve ningún valor.
   */
  guardarMedico(): void {
    const { name } = this.medicoForm.value;
    this.medicoService.crearMedico( this.medicoForm.value )
      .subscribe( ( resp: any ) => {
        console.log( resp );
        Swal.fire( 'Creado', `${ name } creado correctamente`, 'success' );
        this.router.navigateByUrl( `/dashboard/medico/${ resp.Medico._id }` );
      });
  };

}
