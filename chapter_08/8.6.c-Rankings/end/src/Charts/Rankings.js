import { useState } from 'react';
import * as d3 from 'd3';

import RankingFilters from '../Interactions/RankingFilters';
import Card from '../UI/Card';
import ChartContainer from '../ChartComponents/ChartContainer';
import Curve from '../ChartComponents/Curve';
import Label from '../ChartComponents/Label';

const rankingFilters = [
  { id: "satisfaction", label: "Satisfaction" },
  { id: "interest", label: "Interest" },
  { id: "usage", label: "Usage" },
  { id: "awareness", label: "Awareness" },
];

const Rankings = props => {
  const [activeFilter, setActiveFilter] = useState("satisfaction");

  const width = 1000;
  const height = 542;
  const marginRight = 150;
  const marginLeft = 110;
  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - props.margin.top - props.margin.bottom;

  const xScale = d3.scalePoint()
    .domain(props.data.years)
    .range([0, innerWidth]);
  const yScale = d3.scalePoint()
    .domain(d3.range(1, props.data.ids.length + 1))
    .range([0, innerHeight]);

  return (
    <Card>
      <h2>Rankings</h2>
      <RankingFilters
        filters={rankingFilters}
        activeFilter={activeFilter}
      />
      <ChartContainer
        width={width}
        height={height}
        margin={{ top: props.margin.top, right: marginRight, bottom: props.margin.bottom, left: marginLeft }}
      >
        {props.data.years.map(year => (
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
        {props.data.experience.map((framework, i) => (
          <g key={`curve-${framework.id}`}>
            <Curve
              data={framework[activeFilter]}
              xScale={xScale}
              yScale={yScale}
              xAccessor="year"
              yAccessor="rank"
              stroke={props.colorScale(framework.id)}
              strokeWidth={5}
            />
            {framework[activeFilter][0].rank &&
              <Label
                x={-25}
                y={yScale(framework[activeFilter][0].rank)}
                color={props.colorScale(framework.id)}
                label={framework.name}
                textAnchor={"end"}
              />
            }
            <Label
              x={innerWidth + 25}
              y={yScale(framework[activeFilter][framework[activeFilter].length - 1].rank)}
              color={props.colorScale(framework.id)}
              label={framework.name}
              textAnchor={"start"}
            />
          </g>
        ))}
      </ChartContainer>
    </Card>
  )
};

export default Rankings;