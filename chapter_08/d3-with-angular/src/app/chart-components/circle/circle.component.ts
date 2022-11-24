import { Component, Input } from '@angular/core';

@Component({
  selector: '[appCircle]',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent {
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
