import "./Axis.css";

const AxisBottom = props => {
  return (
    <g></g>
  );
};

const AxisLeft = props => {
  return (
    <g></g>
  );
};

const AxisBandBottom = props => {
  return (
    <g></g>
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