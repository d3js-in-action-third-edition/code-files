import { Component, Input } from '@angular/core';

@Component({
  selector: '[appAxis]',
  templateUrl: './axis.component.html',
  styleUrls: ['./axis.component.css']
})
export class AxisComponent {
  @Input() type: string = '';
  @Input() scale: any;
  @Input() innerWidth: number = 0;
  @Input() innerHeight: number = 0;
  @Input() label?: string;

  axisTranslation = '';
  labelTransform = '';
  numberOfTicks = 0;
  ticks = [];

  ngOnInit() {
    this.setTranslations();
    this.calculateNumberOfTicks();
  }

  setTranslations() {
    if (this.type === 'bottom') {
      this.axisTranslation = `translate(0, ${this.innerHeight})`;
      if (this.label) {
        this.labelTransform = `translate(${this.innerWidth / 2}, 45)`;
      }
    } else if (this.type === 'left' && this.label) {
      this.labelTransform = `translate(-42, ${this.innerHeight / 2}) rotate(-90)`;
    }
  }

  calculateNumberOfTicks() {
    if (this.type === 'bottom') {
      this.numberOfTicks = this.innerWidth / 100;
    } else if (this.type === 'left') {
      this.numberOfTicks = this.innerHeight / 50;
    }
    this.ticks = this.scale.ticks(this.numberOfTicks);
  }

  trackByFn(index:number) {
    return `tick-${this.type}-${index}`;
  }

}
