export default function GameOverButton(props){
    return (
      <button onClick={props.onClick}>{props.text}</button>
    );
  }