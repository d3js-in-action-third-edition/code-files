import * as d3 from 'd3';

const Curve = props => {
  const lineGenerator = d3.line()
    .x(d => props.xScale(d[props.xAccessor]))
    .y(d => props.yScale(d[props.yAccessor]))
    .defined(d => d[props.yAccessor] !== null)
    .curve(d3.curveMonotoneX);

  return (
    <path
      d={lineGenerator(props.data)}
      fill="none"
      stroke={props.stroke}
      strokeWidth={props.strokeWidth}
    />
  );
};

export default Curve;