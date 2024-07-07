import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css' ],
})
export class ProgressComponent {

  progreso: number = 50;

  /**
   * @name getter getProgreso
   * @returns { string }
   */
  get getProgreso() {
    return `${ this.progreso }%`;
  };

  cambiarValor( valor: number ) {

    if ( this.progreso >= 100 && valor >= 0 ) {
      this.progreso = 100;
    } else if ( this.progreso <= 0 && valor < 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = this.progreso + valor;
    };
  };
}
