import Circle from "../ChartComponents/Circle";

const Badge = props => {
  return (
    <g 
      className="label"
      transform={`translate(${props.translation[0]}, ${props.translation[1]})`}
    >
      <Circle 
        cx={0}
        cy={0}
        r={18}
        fill={"#fff"}
        stroke={props.strokeColor}
        strokeWidth={3}
      />
      <text
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="#374f5e"
        style={{ fontSize: "12px", fontWeight: "bold" }}
      >
        {props.label}
      </text>
    </g>
  );
};

export default Badge;