import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: ``
})
export class IncrementadorComponent {

  // @Input( 'valor' ) progreso: number = 50;
  @Input() progreso: number = 50;

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
