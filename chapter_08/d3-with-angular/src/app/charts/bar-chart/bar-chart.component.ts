import { Component, Input } from '@angular/core';
import * as d3 from 'd3';

import { MarginType } from 'src/app/utils/types';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  @Input() data: any;
  @Input() margin!: MarginType;
  @Input() colorScale: any;

  width = 300;
  height = 245;
  marginBottom = 85;
  innerWidth = 0;
  innerHeight = 0;

  awarenessData: Array<any> = [];
  ticksArray: Array<string> = [];
  xScale = d3.scaleBand();
  yScale = d3.scaleLinear();

  ngOnInit() {
    this.initializeScales();
  }

  initializeScales() {
    this.innerWidth = this.width - this.margin.left - this.margin.right;
    this.innerHeight = this.height - this.margin.top - this.marginBottom;

    this.data.forEach((d: { id: string; name: string; awareness: any; }) => {
      const awareness: { id: string; name: string; awareness_percentage: number; } = { 
        id: d.id, 
        name: d.name,
        awareness_percentage: d.awareness[d.awareness.length -1].percentage_question 
      };
      this.awarenessData.push(awareness);
    });
    this.awarenessData.sort((a: { awareness_percentage: number; }, b: { awareness_percentage: number; }) => b.awareness_percentage - a.awareness_percentage);
    this.ticksArray = this.awarenessData.map(d => d.name);

    const maxUsers:any = d3.max(this.data, (d:any) => d.user_count);
    this.xScale
      .domain(this.awarenessData.map((d: { name: any; }) => d.name))
      .range([0, this.innerWidth])
      .padding(0.2);
    this.yScale
      .domain([0, 100])
      .range([this.innerHeight, 0]);
  }

  trackByFn(index: number, d: any) {
    return `bar-${d.id}`;
  }
}
