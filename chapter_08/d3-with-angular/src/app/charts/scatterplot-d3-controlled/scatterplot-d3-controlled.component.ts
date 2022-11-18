import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';

import { MarginType } from 'src/app/utils/types';

@Component({
  selector: 'app-scatterplot-d3-controlled',
  templateUrl: './scatterplot-d3-controlled.component.html',
  styleUrls: ['./scatterplot-d3-controlled.component.css']
})
export class ScatterplotD3ControlledComponent {
  @Input() data: any;
  @Input() margin!: MarginType;
  @Input() colorScale: any;
  @ViewChild('scatterplot') scatterplotRef!: ElementRef<SVGElement>;

  width = 300;
  height = 245;

  ngAfterViewInit(): void {
    this.buildScatterplot();
  }

  buildScatterplot() {
    const innerWidth = this.width - this.margin.left - this.margin.right;
    const innerHeight = this.height - this.margin.top - this.margin.bottom;
    
    const scatterplotContainer = d3.select(this.scatterplotRef.nativeElement);

    // Declare scales
    const maxUsers:any = d3.max(this.data, (d:any) => d.user_count);
    const xScale = d3.scaleLinear()
      .domain([0, maxUsers])
      .range([0, innerWidth])
      .nice();
    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([innerHeight, 0]);
    const colorScale = d3.scaleOrdinal()
      .domain(this.data.map((el:any) => el.framework))
      .range(d3.schemeTableau10);

    // Append axes
    const bottomAxis = d3.axisBottom(xScale)
      .ticks([3])
      .tickFormat(d3.format('d'));
    scatterplotContainer
      .append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(bottomAxis);
    const leftAxis = d3.axisLeft(yScale)
      .ticks([5]);
    scatterplotContainer
      .append('g')
        .attr('class', 'axis')
        .call(leftAxis);

    // Append circles
    scatterplotContainer
      .selectAll('.scatterplot-circle')
      .data(this.data)
      .join('circle')
        .attr('class', 'scatterplot-circle')
        .attr('cx', (d:any) => xScale(d.user_count))
        .attr('cy', (d:any) => yScale(d.retention_percentage))
        .attr('r', 6)
        .attr('fill', (d:any) => this.colorScale(d.id));
  }

}
