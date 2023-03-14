import "./styles.css";
export const StartMenu = ({ onStartClick }) => {
  return (
    <div class="bg">
      <div>
        <button onClick={onStartClick}>Start Game</button>
      </div>
    </div>
  );
};

export default StartMenu;
