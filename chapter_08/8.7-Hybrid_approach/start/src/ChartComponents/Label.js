const Label = props => {
  return (
    <text
      x={props.x}
      y={props.y}
      fill={props.color}
      textAnchor={props.textAnchor}
      alignmentBaseline="middle"
      style={{ fontWeight: "bold" }}
    >
      {props.label}
    </text>
  );
};

export default Label;