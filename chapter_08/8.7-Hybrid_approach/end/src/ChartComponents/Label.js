import "./Label.css";

const Label = props => {
  return (
    <text
      className="label"
      x={0}
      y={0}
      fill={props.color}
      textAnchor={props.textAnchor}
      alignmentBaseline="middle"
      style={{ 
        fontWeight: "bold", 
        transform: `translate(${props.x}px, ${props.y}px)` 
      }}
    >
      {props.label}
    </text>
  );
};

export default Label;