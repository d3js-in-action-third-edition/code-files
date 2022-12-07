import { Fragment } from "react";
import * as d3 from "d3";

import Card from "../UI/Card";
import ChartContainer from "../ChartComponents/ChartContainer";
import RankingFilters from "../Interactions/RankingFilters";
import Curve from "../ChartComponents/Curve";
import Label from "../ChartComponents/Label";
import Badge from "../UI/Badge";

const RankingsMobile = props => {
  const width = 300;
  const height = 550;
  const marginRight = 120;
  const marginLeft = 30;
  const innerWidth = width - marginRight - marginLeft;
  const innerHeight = height - props.margin.top - props.margin.bottom;

  const firstYear = props.data.years[0];
  const lastYear = props.data.years[props.data.years.length - 1];
  const middleYear = Math.round(d3.median([firstYear, lastYear]));
  const years = [firstYear, middleYear, lastYear];

  const mobileData = JSON.parse(JSON.stringify(props.data.experience));
  mobileData.forEach(framework => {
    framework.awareness = framework.awareness.filter(d => years.includes(d.year));
    framework.interest = framework.interest.filter(d => years.includes(d.year));
    framework.satisfaction = framework.satisfaction.filter(d => years.includes(d.year));
    framework.usage = framework.usage.filter(d => years.includes(d.year));
  });

  const xScale = d3.scalePoint()
    .domain(years)
    .range([0, innerWidth]);
  const yScale = d3.scalePoint()
    .domain(d3.range(1, props.data.ids.length + 1))
    .range([0, innerHeight]);

  return (
    <Card>
      <h2>Rankings</h2>
      <RankingFilters
        filters={props.rankingFilters}
        activeFilter={props.activeFilter}
        onFilterSelection={props.onFilterSelection}
      />
      <ChartContainer
        width={width}
        height={height}
        margin={{ top: props.margin.top, right: marginRight, bottom: props.margin.bottom, left: marginLeft }}
      >
        {years.map(year => (
          <g 
            key={`line-year-${year}`}
            className="axis"
            transform={`translate(${xScale(year)}, 0)`}
          >
            <line 
              x1={0}
              y1={innerHeight}
              x2={0}
              y2={0}
              strokeDasharray={"6 4"}
            />
            <text
              x={0}
              y={innerHeight + 40}
              textAnchor="middle"
            >
              {year}
            </text>
          </g>
        ))}
        {mobileData.map((framework, i) => (
          <g key={`curve-${framework.id}`}>
            <Curve
              data={framework[props.activeFilter]}
              xScale={xScale}
              yScale={yScale}
              xAccessor="year"
              yAccessor="rank"
              stroke={props.colorScale(framework.id)}
              strokeWidth={5}
            />
            <Label
              x={innerWidth + 30}
              y={yScale(framework[props.activeFilter][framework[props.activeFilter].length - 1].rank)}
              color={props.colorScale(framework.id)}
              label={framework.name}
              textAnchor={"start"}
            />
          </g>
        ))}
        {mobileData.map((framework, i) => (
          <g key={`bages-${framework.id}`}>
            {framework[props.activeFilter].map((selection, i) => (
              <Fragment key={`${framework.id}-selection-${i}`}>
                {selection.rank &&
                  <Badge
                    translation={[xScale(selection.year), yScale(selection.rank)]}
                    strokeColor={props.colorScale(framework.id)}
                    label={`${Math.round(selection.percentage_question)}%`}
                  />
                }
              </Fragment>
            ))}
          </g>
        ))}
      </ChartContainer>
    </Card>
  );
};

export default RankingsMobile;