import { useRef, useEffect } from "react";
import * as d3 from "d3";

const Curve = props => {
  const lineGenerator = d3.line()
    .x(d => props.xScale(d[props.xAccessor]))
    .y(d => props.yScale(d[props.yAccessor]))
    .defined(d => d[props.yAccessor] !== null)
    .curve(d3.curveMonotoneX);

  const pathRef = useRef();
  useEffect(() => {
    const path = pathRef.current;

    d3.select(path)
      .transition()
      .duration(400)
      .ease(d3.easeCubicOut)
        .attr("d", lineGenerator(props.data));
  }, [props.data, lineGenerator]);

  return (
    <path
      ref={pathRef} 
      // Remove the d attribute!
      fill="none" 
      stroke={props.stroke} 
      strokeWidth={props.strokeWidth}
    />
  );
};

export default Curve;