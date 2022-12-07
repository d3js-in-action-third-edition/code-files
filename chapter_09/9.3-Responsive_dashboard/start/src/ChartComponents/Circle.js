const Circle = props => {
  return (
    <circle 
      cx={props.cx}
      cy={props.cy}
      r={props.r}
      fill={props.fill}
      stroke={props.stroke ? props.stroke : "none"}
      strokeWidth={props.strokeWidth ? props.strokeWidth : 0} 
    />
  )
};

export default Circle;