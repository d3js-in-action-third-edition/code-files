import * as d3 from "d3";
import "./Axis.css";

const AxisBottom = props => {
  const numberOfTicks = props.innerWidth / 100;
  const ticks = props.scale.ticks(numberOfTicks);

  return (
    <g className="axis" transform={`translate(0, ${props.innerHeight})`} >
      <line x1={0} y1={0} x2={props.innerWidth} y2={0} />
      {ticks.map(tick => (
        <g key={tick} transform={`translate(${props.scale(tick)}, 0)`}>
          <line x1={0} y1={0} x2={0} y2={5} />
          <text x={0} y={20} textAnchor="middle" >
            {tick}
          </text>
        </g>
      ))}
      {props.label &&
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${props.innerWidth / 2}, 45)`}
        >
          {props.label}
        </text>
      }
    </g>
  );
};

const AxisLeft = props => {
  const numberOfTicks = props.innerHeight / 50;
  const ticks = props.scale.ticks(numberOfTicks);

  return (
    <g className="axis">
      <line x1={0} y1={props.innerHeight} x2={0} y2={0} />
      {ticks.map(tick => (
        <g key={tick} transform={`translate(0, ${props.scale(tick)})`}>
          <line x1={-5} y1={0} x2={0} y2={0} />
          <text x={-10} y={0} textAnchor="end" alignmentBaseline="middle" >
            {tick}
          </text>
        </g>
      ))}
      {props.label &&
        <text
          textAnchor="middle"
          transform={`translate(-42, ${props.innerHeight / 2}) rotate(-90)`}
        >
          {props.label}
        </text>
      }
    </g>
  );
};

const AxisBandBottom = props => {
  return (
    <g className="axis" transform={`translate(0, ${props.innerHeight})`} >
      <line x1={0} y1={0} x2={props.innerWidth} y2={0} />
      {props.ticks.map(tick => (
        <text
          key={tick}
          textAnchor="end"
          alignmentBaseline="middle"
          transform={`translate(${props.scale(tick) + props.scale.bandwidth() / 2}, 8) rotate(-90)`}
        >
          {tick}
        </text>
      ))}
    </g>
  );
};

const Axis = props => {

  switch (props.type) {
    case "bottom":
      return AxisBottom(props);
    case "left":
      return AxisLeft(props);
    case "band":
      return AxisBandBottom(props);
    // no default
  };

};

export default Axis;