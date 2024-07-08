import { Component, Input } from '@angular/core';

import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: ``
})
export class DonaComponent {

  @Input() title: string = 'Sin titulo';

  // Etiquetas de la gráfica Doughnut
  @Input( 'labels' ) doughnutChartLabels: string[] = [ 'Label1', 'Label2', 'Label3' ];

  // Datos y configuración de la gráfica Doughnut
  @Input( 'data' ) doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [ 350, 450, 100 ],
        backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]
      },
    ]
  };

  // Tipo de gráfica
  public doughnutChartType: ChartType = 'doughnut';
}
