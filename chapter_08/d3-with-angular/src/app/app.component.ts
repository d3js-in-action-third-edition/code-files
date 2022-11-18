import { Component } from '@angular/core';
import * as d3 from 'd3';

import { DataType } from './utils/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data!: DataType;

  constructor() {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const dataURL = "https://d3js-in-action-third-edition.github.io/hosted-data/apis/front_end_frameworks.json";
    
    d3.json(dataURL).then(data => {
      console.log("data", data);
      this.data = data as DataType;
    });
  }
}
