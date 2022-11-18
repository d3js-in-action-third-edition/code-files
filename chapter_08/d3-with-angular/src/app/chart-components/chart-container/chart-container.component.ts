import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.css']
})
export class ChartContainerComponent {
  @Input() width:number = 0;
  @Input() height:number = 0;
  @Input() margin:any = {};

  viewBox:string = '';
  groupTranslation:string = '';

  ngOnInit() {
    this.viewBox = `0 0 ${this.width} ${this.height}`;
    this.groupTranslation = `translate(${this.margin.left}, ${this.margin.top})`;
  }

}
