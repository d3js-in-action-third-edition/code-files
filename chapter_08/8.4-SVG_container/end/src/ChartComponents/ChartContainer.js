const ChartContainer = props => {
  return (
    <svg viewBox={`0 0 ${props.width} ${props.height}`}>
      <g transform={`translate(${props.margin.left}, ${props.margin.top})`}>
        {props.children}
      </g>
    </svg>
  );
};

export default ChartContainer;