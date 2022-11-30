import "./Label.css";

const Label = props => {
  return (
    <g 
      className="label"
      style={{ transform: `translate(${props.x}px, ${props.y}px)` }}
    >
      <text
        x={0}
        y={0}
        fill={props.color}
        textAnchor={props.textAnchor}
        alignmentBaseline="middle"
        style={{ fontWeight: "bold" }}
      >
        {props.label}
      </text>
    </g>
  );
};

export default Label;