import { Component, Input } from '@angular/core';

@Component({
  selector: '[appCircles]',
  templateUrl: './circles.component.html',
  styleUrls: ['./circles.component.css']
})
export class CirclesComponent {
  @Input() data: any;
  @Input() xScale: any;
  @Input() yScale: any;
  @Input() colorScale: any;
  @Input() xAccessor: string = '';
  @Input() yAccessor: string = '';
  @Input() colorAccessor: string = '';
  @Input() radius: number = 10;

  trackByFn(index: number, d: any) {
    return `scatterplot-circle-${d.id}`;
  }

}
