import "./styles.css";
export const StartMenu = ({ onStartClick }) => {
  return (
    <div className="bg">
      <div className="topicHeight">
        <h1 className="upbeat">UP BEAT</h1>
      </div>
      <div className="content">
        <button className="startButton" onClick={onStartClick}>
          START
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
