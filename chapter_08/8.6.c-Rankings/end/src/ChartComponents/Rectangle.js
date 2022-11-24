const Rectangle = props => {
  return (
    <rect 
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
      fill={props.fill}
    />
  )
};

export default Rectangle;