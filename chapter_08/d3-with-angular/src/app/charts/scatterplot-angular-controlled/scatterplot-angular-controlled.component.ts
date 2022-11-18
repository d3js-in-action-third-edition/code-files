import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scatterplot-angular-controlled',
  templateUrl: './scatterplot-angular-controlled.component.html',
  styleUrls: ['./scatterplot-angular-controlled.component.css']
})
export class ScatterplotAngularControlledComponent {
  @Input() data:any;
  @Input() margin:any;
  @Input() colorScale:any;

  width = 300;
  height = 245;

}
