import { Component, Input, OnInit, ElementRef, ViewChild, OnChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: '[appCurve]',
  templateUrl: './curve.component.html',
  styleUrls: ['./curve.component.css']
})
export class CurveComponent {
  @Input() data: Array<any> = [];
  @Input() stroke: string = "#000";
  @Input() strokeWidth: number = 1;
  @Input() xAccessor: any;
  @Input() yAccessor: any;
  @ViewChild('path') pathRef!: ElementRef<SVGElement>;

  lineGenerator = d3.line();

  ngOnInit() {
    this.initializeVariables();
  }

  ngAfterViewInit(): void {
    this.updatePath();
  }

  ngOnChanges() {
    if (this.pathRef) {
      this.updatePath();
    }
  }

  initializeVariables() {
    this.lineGenerator
      .x(d => this.xAccessor(d))
      .y(d => this.yAccessor(d))
      .defined(d => this.yAccessor(d) !== null)
      .curve(d3.curveMonotoneX);
  }

  updatePath() {
    d3.select(this.pathRef.nativeElement)
      .transition()
      .duration(400)
      .ease(d3.easeCubicOut)
        .attr("d", this.lineGenerator(this.data));
  }
}
