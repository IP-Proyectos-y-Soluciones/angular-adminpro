import { Component } from '@angular/core';

import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: ``
})
export class Grafica1Component {

  // Etiquetas de la gráfica Doughnut
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];

  // Datos y configuración de la gráfica Doughnut
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { 
        data: [350, 450, 100],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'], 
      },
    ],
  };

  // Tipo de gráfica
  public doughnutChartType: ChartType = 'doughnut';
}
