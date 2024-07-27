import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: ``
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];

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
    this.medicoForm = this.fb.group({
      name: [ 
        'Carlos Sanchez', 
        Validators.required, 
      ],
      hospital: [
        '', 
        Validators.required,
      ]
    });

    this.cargarHospitales();
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
        console.log( hospitales );
        this.hospitales = hospitales;
      });
  };

  guardarMedico() {
    console.log( this.medicoForm.value );
  };

}
