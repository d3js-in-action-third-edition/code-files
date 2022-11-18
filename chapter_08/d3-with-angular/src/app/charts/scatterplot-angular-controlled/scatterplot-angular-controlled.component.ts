import { Component, Input } from '@angular/core';
import * as d3 from 'd3';

import { MarginType } from 'src/app/utils/types';

@Component({
  selector: 'app-scatterplot-angular-controlled',
  templateUrl: './scatterplot-angular-controlled.component.html',
  styleUrls: ['./scatterplot-angular-controlled.component.css']
})
export class ScatterplotAngularControlledComponent {
  @Input() data: any;
  @Input() margin!: MarginType;
  @Input() colorScale: any;

  width = 300;
  height = 245;
  innerWidth = 0;
  innerHeight = 0;

  xScale = d3.scaleLinear();
  yScale = d3.scaleLinear();

  ngOnInit() {
    this.initializeScales();
  }

  initializeScales() {
    this.innerWidth = this.width - this.margin.left - this.margin.right;
    this.innerHeight = this.height - this.margin.top - this.margin.bottom;

    const maxUsers:any = d3.max(this.data, (d:any) => d.user_count);
    this.xScale
      .domain([0, maxUsers])
      .range([0, this.innerWidth])
      .nice();
    this.yScale
      .domain([0, 100])
      .range([this.innerHeight, 0]);
  }

}
