import * as d3 from "d3";

import Card from "../UI/Card";
import ChartContainer from "../ChartComponents/ChartContainer";
import Axis from "../ChartComponents/Axis";
import Rectangle from "../ChartComponents/Rectangle";

const BarChartMobile = props => {
  const width = 300;
  const height = 400;
  const marginRight = 38;
  const marginLeft = 95;
  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - props.margin.top - props.margin.bottom;

  const awarenessData = [];
  props.data.forEach(d => {
    const awareness = { 
      id: d.id, 
      name: d.name,
      awareness_percentage: d.awareness[d.awareness.length -1].percentage_question 
    };
    awarenessData.push(awareness);
  });
  awarenessData.sort((a, b) => b.awareness_percentage - a.awareness_percentage);

  const xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, innerWidth]);
  const yScale = d3.scaleBand()
    .domain(awarenessData.map(d => d.name))
    .range([0, innerHeight])
    .padding(0.2);

  return (
    <Card>
      <h2>Awareness</h2>
      <ChartContainer
        width={width}
        height={height}
        margin={{ top: props.margin.top, right: marginRight, bottom: props.margin.bottom, left: marginLeft }}
      >
        <Axis 
          type="bandLeft"
          scale={yScale}
          ticks={awarenessData.map(d => d.name)}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
        />
        {awarenessData.map(framework => (
          <g 
            key={`rectangle-${framework.id}`}
            className="axis"
          >
            <Rectangle
              x={0}
              y={yScale(framework.name)}
              width={xScale(framework.awareness_percentage)}
              height={yScale.bandwidth()}
              fill={props.colorScale(framework.id)}
            />
            <text
              x={xScale(framework.awareness_percentage) + 5}
              y={yScale(framework.name) + yScale.bandwidth()/2}
              alignmentBaseline="middle"
              style={{ fontSize: "13px" }}
            >
              {`${Math.round(framework.awareness_percentage)}%`}
            </text>
          </g>
        ))}
      </ChartContainer>
    </Card>
  );
};

export default BarChartMobile;