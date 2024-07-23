import { Component, OnInit } from '@angular/core';

import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: ``
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  constructor(
    private hospitalService: HospitalService, 
  ) { }

  /**
   * @name ngOnInit 
   * @description Este método se ejecuta cuando se inicia el componente. Carga la lista de hospitales desde el servicio.
   * @returns { void } - Este método se ejecuta cuando se inicia el componente. Se carga la lista de hospitales desde el servicio. 20 hospitales se cargan por página, y 30 hospitales son mostrados por página en la vista. 20 hospitales se cargan por página, y 30 hospitales son mostrados por página en la vista.
   */
  ngOnInit (): void {
    this.cargarHospitales();
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
}
