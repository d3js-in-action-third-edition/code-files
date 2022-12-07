const Button = props => {
  return (
    <button
      className={`button ${props.isActive ? "active" : ""}`}
      onClick={() => props.onClick(props.id)}
      type={props.type ? props.type : "button"}
    >
      {props.label}
    </button>
  );
};

export default Button;