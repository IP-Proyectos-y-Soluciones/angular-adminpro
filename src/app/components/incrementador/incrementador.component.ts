import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: ``
})
export class IncrementadorComponent implements OnInit {

  ngOnInit () {
    this.btnClass = `btn ${ this.btnClass }`;
  };

  // @Input() progreso: number = 50;
  @Input( 'valor' ) progreso: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output( 'valor' ) valorSalida: EventEmitter<number> = new EventEmitter();


  /**
   * @name cambiarValor
   * @description Cambia el valor en la barra de progreso
   * @param valor
   * @returns
   */
  cambiarValor( valor: number ) {

    if ( this.progreso >= 100 && valor >= 0 ) {
      this.valorSalida.emit( 100 );
      return this.progreso = 100;
    };

    if ( this.progreso <= 0 && valor < 0 ) {
      this.valorSalida.emit( 0 );
      return this.progreso = 0;
    };

    this.progreso = this.progreso + valor;
    this.valorSalida.emit( this.progreso );
  };

  
  /**
   * @name onChange
   * @description Escucha el evento de cambio en el input y lo emite como evento al padre
   * @param nuevoValor 
   */
  onChange ( nuevoValor: number ) {
    
    if ( nuevoValor >= 100 ) {
      this.progreso = 100;
    } else if ( nuevoValor <= 0 ) { 
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    
    this.valorSalida.emit( this.progreso );
  }
}
