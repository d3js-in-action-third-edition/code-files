import { Component, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  @Input() data:any;

  margin = {top: 30, right: 10, bottom: 50, left: 60};
  colorScale = d3.scaleOrdinal();

  ngOnInit() {
    this.setColorScale();
  }

  setColorScale() {
    this.colorScale
      .domain(this.data.ids)
      .range(d3.schemeTableau10)
  }

}
