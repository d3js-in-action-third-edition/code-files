import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

import { MarginType } from 'src/app/utils/types';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent {
  @Input() data: any;
  @Input() margin!: MarginType;
  @Input() colorScale: any;

  width = 1000;
  height = 542;
  marginRight = 150;
  marginLeft = 110;
  innerWidth = 0;
  innerHeight = 0;

  xScale = d3.scalePoint();
  yScale = d3.scalePoint();
  xAccessor: any = (d: {year: number, rank: number, percentage_question: number}) => {
    return this.xScale(d.year.toString());
  }
  yAccessor: any = (d: {year: number, rank: number, percentage_question: number}) => {
    if (d.rank) {
      return this.yScale(d.rank.toString());
    }
    return null;
  }

  rankingFilters = [
    { id: "satisfaction", label: "Satisfaction" },
    { id: "interest", label: "Interest" },
    { id: "usage", label: "Usage" },
    { id: "awareness", label: "Awareness" },
  ];
  activeFilter = "satisfaction";

  ngOnInit() {
    this.initializeVariables();
  }

  initializeVariables() {
    this.innerWidth = this.width - this.marginLeft - this.marginRight;
    this.innerHeight = this.height - this.margin.top - this.margin.bottom;

    const years = this.data.years.map((year: number) => year.toString());
    this.xScale
      .domain(years)
      .range([0, this.innerWidth]);
    const ranks: any = d3.range(1, this.data.ids.length + 1).map((rank: number) => rank.toString());
    this.yScale
      .domain(ranks)
      .range([0, this.innerHeight]);
  }

  labelVerticalPosition(item: Array<any>, position: string) {
    if (position === "left" && item[0].rank) {
      return this.yScale(item[0].rank.toString());
    } else if (position === "right") {
      return this.yScale(item[item.length - 1].rank.toString());
    } else {
      return 0;
    }
  }

  translateTick(year: number) {
    return `translate(${this.xScale(year.toString())}, 0)`;
  }

  getBadgeTranslation(selection: {year: number, rank: number, percentage_question: number }) {
    return [
      parseFloat(this.xScale(selection.year.toString()) as unknown as string), 
      parseFloat(this.yScale(selection.rank.toString()) as unknown as string)
    ];
  }

  getPercentageLabel(percentage: number) {
    return `${Math.round(percentage)}%`;
  }

  handleClick(id: string) {
    this.activeFilter = id;
  }
}
