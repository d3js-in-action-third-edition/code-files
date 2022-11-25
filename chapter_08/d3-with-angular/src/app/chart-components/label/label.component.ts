import { Component, Input } from '@angular/core';

@Component({
  selector: '[appLabel]',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent {
  @Input() x: number = 0;
  @Input() y: number = 0;
  @Input() fill: string = '#000';
  @Input() label: string = '';
  @Input() textAnchor: string = 'start';

  getTransform() {
    return `translate(${this.x}px, ${this.y}px)`;
  }
}
