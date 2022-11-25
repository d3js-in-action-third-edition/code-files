import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChartsComponent } from './charts/charts/charts.component';
import { ScatterplotD3ControlledComponent } from './charts/scatterplot-d3-controlled/scatterplot-d3-controlled.component';
import { CardComponent } from './ui/card/card.component';
import { ChartContainerComponent } from './chart-components/chart-container/chart-container.component';
import { ScatterplotAngularControlledComponent } from './charts/scatterplot-angular-controlled/scatterplot-angular-controlled.component';
import { AxisComponent } from './chart-components/axis/axis.component';
import { CircleComponent } from './chart-components/circle/circle.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { ButtonComponent } from './ui/button/button.component';
import { RankingFiltersComponent } from './interactions/ranking-filters/ranking-filters.component';
import { RankingsComponent } from './charts/rankings/rankings.component';
import { LabelComponent } from './chart-components/label/label.component';
import { BadgeComponent } from './ui/badge/badge.component';
import { CurveComponent } from './chart-components/curve/curve.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    ScatterplotD3ControlledComponent,
    CardComponent,
    ChartContainerComponent,
    ScatterplotAngularControlledComponent,
    AxisComponent,
    CircleComponent,
    BarChartComponent,
    ButtonComponent,
    RankingFiltersComponent,
    RankingsComponent,
    LabelComponent,
    BadgeComponent,
    CurveComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
