
function Button(props) {
  
  return (
    <button
      placeholder={props.placeholder}
      style={{ fontSize: props.Size, backgroundColor: props.backgroundColor }}
      id={props.id}
      className={props.className}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;


