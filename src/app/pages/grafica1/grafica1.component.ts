import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: ``,
})
export class Grafica1Component {
  public labels1: string[] = [ 'Pan', 'Refrescos', 'Tacos', ];

  public labels2: string[] = [ 'Vino', 'Tequila', 'Cerveza', ];

  public labels3: string[] = [ 'P. Carta', 'P. Oficio', 'P. Tabloide', ];

  public data1 = {
    labels: this.labels1,
    datasets: [
      {
        data: [ 10, 15, 40 ],
        backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]
      },
    ],
  };

  public data2 = {
    labels: this.labels2,
    datasets: [
      {
        data: [ 30, 45, 60 ],
        backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]
      },
    ]
  };

  public data3 = {
    labels: this.labels3,
    datasets: [
      {
        data: [ 20, 50, 30 ],
        backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]
      },
    ]
  };
}
